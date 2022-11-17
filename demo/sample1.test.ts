import { describe, expect, test } from '../mod.ts'

const isString = (o: unknown) => typeof o === 'string'

describe('Sample1', async () => {
  await describe('isString', async () => {
    await test({ given: 'a string', should: 'return true' }, () => {
      expect(isString('foo')).toBe(true)
    })
    await test({ given: 'a number', should: 'return false' }, () => {
      expect(isString(345)).toBe(false)
    })
  })
})
