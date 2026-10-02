import * as decoding from 'lib0/decoding'
import * as encoding from 'lib0/encoding'
import * as awareness from 'y-protocols/awareness'
import * as sync from 'y-protocols/sync'
import * as Y from 'yjs'

export interface Peer {
  userId?: string
  send: (message: Uint8Array) => void
  close: (code: number, reason: string) => void
}

// Wire format compatible with y-websocket: sync=0, awareness=1, query awareness=3.
export class CollaborationRoom {
  readonly doc = new Y.Doc()
  readonly awareness = new awareness.Awareness(this.doc)
  readonly peers = new Map<Peer, Set<number>>()
  private pending: Promise<void> = Promise.resolve()

  constructor(
    state: Uint8Array | null,
    content: string,
    private persist: (state: Uint8Array, content: string) => Promise<void>,
  ) {
    this.awareness.setLocalState(null)
    if (state) Y.applyUpdate(this.doc, state)
    else this.doc.getText('content').insert(0, content)
    this.awareness.on(
      'update',
      (
        { added, updated, removed }: { added: number[]; updated: number[]; removed: number[] },
        origin: Peer | null,
      ) => {
        const owned = origin && this.peers.get(origin)
        for (const id of added) owned?.add(id)
        for (const id of removed) owned?.delete(id)
        const encoder = encoding.createEncoder()
        encoding.writeVarUint(encoder, 1)
        encoding.writeVarUint8Array(
          encoder,
          awareness.encodeAwarenessUpdate(this.awareness, [...added, ...updated, ...removed]),
        )
        this.broadcast(encoding.toUint8Array(encoder))
      },
    )
  }

  private broadcast(message: Uint8Array) {
    for (const peer of this.peers.keys()) peer.send(message)
  }

  join(peer: Peer) {
    this.peers.set(peer, new Set())
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, 0)
    sync.writeSyncStep1(encoder, this.doc)
    peer.send(encoding.toUint8Array(encoder))
    if (this.awareness.getStates().size) this.sendAwareness(peer)
  }

  private sendAwareness(peer: Peer) {
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, 1)
    encoding.writeVarUint8Array(
      encoder,
      awareness.encodeAwarenessUpdate(this.awareness, [...this.awareness.getStates().keys()]),
    )
    peer.send(encoding.toUint8Array(encoder))
  }

  receive(peer: Peer, message: Uint8Array, authorize: () => Promise<boolean>) {
    // Frames already received must still persist when the user switches files.
    if (!this.peers.has(peer)) return Promise.resolve()
    const task = this.pending.then(async () => {
      const canWrite = await authorize()
      const decoder = decoding.createDecoder(message)
      const type = decoding.readVarUint(decoder)
      if (type === 0) {
        const subtype = decoding.readVarUint(decoder)
        if (subtype === sync.messageYjsSyncStep1) {
          const encoder = encoding.createEncoder()
          encoding.writeVarUint(encoder, 0)
          sync.readSyncStep1(decoder, encoder, this.doc)
          peer.send(encoding.toUint8Array(encoder))
        } else if (subtype === sync.messageYjsSyncStep2 || subtype === sync.messageYjsUpdate) {
          const update = decoding.readVarUint8Array(decoder)
          // Readers may send an empty sync step2 but cannot change the document.
          const candidate = new Y.Doc()
          try {
            Y.applyUpdate(candidate, Y.encodeStateAsUpdate(this.doc))
            Y.applyUpdate(candidate, update)
            const next = Y.encodeStateAsUpdate(candidate)
            const previous = Y.encodeStateAsUpdate(this.doc)
            if (Buffer.from(next).equals(Buffer.from(previous))) return
            if (!canWrite) throw new Error('Somente leitura')
            // Persist before accepting/broadcasting. Failed writes leave the room intact.
            await this.persist(next, candidate.getText('content').toString())
            Y.applyUpdate(this.doc, update)
            const encoder = encoding.createEncoder()
            encoding.writeVarUint(encoder, 0)
            sync.writeUpdate(encoder, update)
            this.broadcast(encoding.toUint8Array(encoder))
          } finally {
            candidate.destroy()
          }
        } else throw new Error('Mensagem de sincronização inválida')
      } else if (type === 1) {
        awareness.applyAwarenessUpdate(this.awareness, decoding.readVarUint8Array(decoder), peer)
      } else if (type === 3) this.sendAwareness(peer)
      else if (type === 4) {
        // Ordered persistence barrier for compile requests.
        const encoder = encoding.createEncoder()
        encoding.writeVarUint(encoder, 4)
        encoding.writeVarUint(encoder, decoding.readVarUint(decoder))
        peer.send(encoding.toUint8Array(encoder))
      } else throw new Error('Mensagem inválida')
    })
    this.pending = task.catch(() => {
      peer.close(1008, 'Não foi possível sincronizar o arquivo')
    })
    return task
  }

  leave(peer: Peer) {
    const ids = this.peers.get(peer)
    this.peers.delete(peer)
    if (ids) awareness.removeAwarenessStates(this.awareness, [...ids], null)
  }

  async flush() {
    await this.pending
  }

  destroy() {
    this.awareness.destroy()
    this.doc.destroy()
  }
}
