import { expect } from './deps.ts'

const contexts: Deno.TestContext[] = []

type TestResult = Promise<void> | void
type DescribeHandler = () => Promise<void>
type TestHandler = () => TestResult

export type TestDesc = { given: string; should: string }

export const testDescToString = ({ given, should }: TestDesc, paddingLevel = 0): string => {
  const newLinePadding = Array.from(Array(paddingLevel * 2))
    .fill(' ')
    .join('')
  return `given: ${given}\n${newLinePadding}should: ${should}`
}

const describe = async (desc: string | TestDesc, handler: DescribeHandler): Promise<void> => {
  const descString = typeof desc === 'string' ? desc : testDescToString(desc)
  const ctx = contexts[contexts.length - 1]
  if (!ctx) {
    await Deno.test(descString, async (t) => {
      contexts.push(t)
      await handler()
      contexts.pop()
    })
    return
  }
  await ctx.step(descString, async (t) => {
    contexts.push(t)
    await handler()
    contexts.pop()
  })
}

const test = async (desc: string | TestDesc, handler: TestHandler): Promise<void> => {
  const descString = typeof desc === 'string' ? desc : testDescToString(desc, contexts.length)
  const ctx = contexts[contexts.length - 1]
  if (!ctx) {
    throw new Error('Missing describe!')
  }
  await ctx.step(descString, async () => {
    await handler()
  })
}

export type { TestResult, DescribeHandler, TestHandler }
export { describe, expect, test }
