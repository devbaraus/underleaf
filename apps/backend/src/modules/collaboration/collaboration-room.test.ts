import { describe, expect, it } from 'bun:test'
import * as decoding from 'lib0/decoding'
import * as encoding from 'lib0/encoding'
import * as sync from 'y-protocols/sync'
import * as awareness from 'y-protocols/awareness'
import * as Y from 'yjs'
import { CollaborationRoom, type Peer } from './collaboration-room'

function peer() {
  const messages: Uint8Array[] = []
  const closes: number[] = []
  return {
    messages,
    closes,
    send: (message: Uint8Array) => {
      messages.push(message)
    },
    close: (code: number) => {
      closes.push(code)
    },
  } satisfies Peer & { messages: Uint8Array[]; closes: number[] }
}
function update(doc: Y.Doc) {
  const encoder = encoding.createEncoder()
  encoding.writeVarUint(encoder, 0)
  sync.writeUpdate(encoder, Y.encodeStateAsUpdate(doc))
  return encoding.toUint8Array(encoder)
}
function clone(room: CollaborationRoom) {
  const doc = new Y.Doc()
  Y.applyUpdate(doc, Y.encodeStateAsUpdate(room.doc))
  return doc
}

describe('collaboration room', () => {
  it('merges concurrent edits and restores the same CRDT after restart', async () => {
    let state: Uint8Array | null = null
    const room = new CollaborationRoom(null, 'LaTeX', async (next) => {
      state = next
    })
    const a = peer(),
      b = peer()
    room.join(a)
    room.join(b)
    const first = clone(room),
      second = clone(room)
    first.getText('content').insert(0, 'A')
    second.getText('content').insert(0, 'B')
    await Promise.all([
      room.receive(a, update(first), async () => true),
      room.receive(b, update(second), async () => true),
    ])
    expect(room.doc.getText('content').toString()).toContain('LaTeX')
    expect(room.doc.getText('content').length).toBe(7)
    const restarted = new CollaborationRoom(state, 'ignored', async () => {})
    expect(restarted.doc.getText('content').toString()).toBe(room.doc.getText('content').toString())
    restarted.join(a)
    await restarted.receive(a, update(first), async () => true)
    expect(restarted.doc.getText('content').length).toBe(7)
    first.destroy()
    second.destroy()
    room.destroy()
    restarted.destroy()
  })

  it('answers the y-websocket initial sync without duplicating seed content', async () => {
    const room = new CollaborationRoom(null, 'initial', async () => {})
    const client = new Y.Doc(),
      p = peer()
    room.join(p)
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, 0)
    sync.writeSyncStep1(encoder, client)
    await room.receive(p, encoding.toUint8Array(encoder), async () => false)
    const decoder = decoding.createDecoder(p.messages.at(-1)!)
    expect(decoding.readVarUint(decoder)).toBe(0)
    sync.readSyncMessage(decoder, encoding.createEncoder(), client, null)
    expect(client.getText('content').toString()).toBe('initial')
    await room.receive(p, update(client), async () => false)
    expect(p.closes).toEqual([])
    expect(room.doc.getText('content').toString()).toBe('initial')
    client.destroy()
    room.destroy()
  })

  it('rejects viewer edits, revoked membership and malformed messages', async () => {
    const room = new CollaborationRoom(null, 'original', async () => {})
    const p = peer()
    room.join(p)
    const doc = clone(room)
    doc.getText('content').insert(0, 'forbidden')
    await expect(room.receive(p, update(doc), async () => false)).rejects.toThrow('Somente leitura')
    await room.flush()
    expect(room.doc.getText('content').toString()).toBe('original')
    await expect(
      room.receive(p, update(doc), async () => {
        throw new Error('revoked')
      }),
    ).rejects.toThrow('revoked')
    await expect(room.receive(p, new Uint8Array(), async () => true)).rejects.toThrow()
    expect(p.closes).toEqual([1008, 1008, 1008])
    doc.destroy()
    room.destroy()
  })

  it('does not accept or broadcast an edit when persistence fails', async () => {
    const room = new CollaborationRoom(null, 'original', async () => {
      throw new Error('database unavailable')
    })
    const p = peer()
    room.join(p)
    const doc = clone(room)
    doc.getText('content').insert(0, 'new')
    const before = p.messages.length
    await expect(room.receive(p, update(doc), async () => true)).rejects.toThrow(
      'database unavailable',
    )
    expect(room.doc.getText('content').toString()).toBe('original')
    expect(p.messages.length).toBe(before)
    doc.destroy()
    room.destroy()
  })

  it('persists queued edits after disconnect and confirms compilation only after writes finish', async () => {
    let finish: (() => void) | undefined
    let stored = ''
    const gate = new Promise<void>((resolve) => {
      finish = resolve
    })
    const room = new CollaborationRoom(null, 'initial', async (_state, content) => {
      await gate
      stored = content
    })
    const p = peer()
    room.join(p)
    const doc = clone(room)
    doc.getText('content').insert(0, 'new ')
    const edit = room.receive(p, update(doc), async () => true)
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, 4)
    encoding.writeVarUint(encoder, 42)
    const barrier = room.receive(p, encoding.toUint8Array(encoder), async () => true)
    room.leave(p)
    expect(stored).toBe('')
    finish!()
    await Promise.all([edit, barrier])
    expect(stored).toBe('new initial')
    const decoder = decoding.createDecoder(p.messages.at(-1)!)
    expect(decoding.readVarUint(decoder)).toBe(4)
    expect(decoding.readVarUint(decoder)).toBe(42)
    doc.destroy()
    room.destroy()
  })

  it('removes presence on disconnect without storing it in the document', async () => {
    const room = new CollaborationRoom(null, '', async () => {})
    const p = peer()
    room.join(p)
    const client = new Y.Doc(),
      presence = new awareness.Awareness(client)
    presence.setLocalState({ user: { name: 'Editor' } })
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, 1)
    encoding.writeVarUint8Array(
      encoder,
      awareness.encodeAwarenessUpdate(presence, [client.clientID]),
    )
    await room.receive(p, encoding.toUint8Array(encoder), async () => false)
    expect(room.awareness.getStates().size).toBe(1)
    room.leave(p)
    expect(room.awareness.getStates().size).toBe(0)
    presence.destroy()
    client.destroy()
    room.destroy()
  })
})
