import { Elysia } from 'elysia'
import { prisma } from '@/lib/db'
import type { Prisma } from '@/generated/prisma/client'

export type Tx = Prisma.TransactionClient

const TX_OPTIONS = { maxWait: 5_000, timeout: 15_000 }

type TxScope = ReturnType<typeof openTransaction>

function openTransaction() {
  let commit!: () => void
  let rollback!: (reason: unknown) => void
  const decided = new Promise<void>((resolve, reject) => {
    commit = resolve
    rollback = reject
  })

  let handOff!: (tx: Tx) => void
  let failedToStart!: (reason: unknown) => void
  const client = new Promise<Tx>((resolve, reject) => {
    handOff = resolve
    failedToStart = reject
  })

  const settled = prisma
    .$transaction((tx) => {
      handOff(tx)
      return decided
    }, TX_OPTIONS)
    .catch((error) => {
      failedToStart(error)
      throw error
    })

  settled.catch(() => {})

  const committed: (() => unknown)[] = []
  const afterCommit = (effect: () => unknown) => {
    committed.push(effect)
  }

  return { client, commit, rollback, settled, committed, afterCommit }
}

const scopeOf = (context: unknown) => (context as { txScope?: TxScope }).txScope

export const DbTransactionMacro = new Elysia({ name: 'database-transaction' })
  .decorate('db', prisma)
  .macro({
    transactional: {
      async resolve() {
        const txScope = openTransaction()
        return { tx: await txScope.client, txScope, afterCommit: txScope.afterCommit }
      },
      async afterHandle(context) {
        const txScope = scopeOf(context)
        if (!txScope) return

        txScope.commit()
        await txScope.settled
        await Promise.all(txScope.committed.map((effect) => effect()))
      },
      async error(context) {
        const txScope = scopeOf(context)
        if (!txScope) return

        txScope.rollback(context.error)
        await txScope.settled.catch(() => {})
      },
      afterResponse(context) {
        scopeOf(context)?.rollback(new Error('request ended without commit'))
      },
    },
  })
