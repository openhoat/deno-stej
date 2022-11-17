[![deno module](https://shield.deno.dev/x/stej)](https://deno.land/x/stej)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/stej/mod.ts)
[![CI](https://github.com/openhoat/deno-stej/actions/workflows/build.yml/badge.svg)](https://github.com/openhoat/deno-stej/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/openhoat/deno-stej/branch/main/graph/badge.svg?token=VFJ63YUYY0)](https://app.codecov.io/openhoat/openhoat/deno-stej)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![license](https://img.shields.io/github/license/openhoat/deno-stej)](https://github.com/openhoat/deno-stej/blob/master/LICENSE)

# Stej

Make Deno tests in the Jest way.

This module allow you to write tests like you did with [Jest](https://jestjs.io/).

## Getting started

Simply use the provided wrapper methods: `describe`, `test`

```typescript
import { describe, expect, test } from 'https://deno.land/x/stej/mod.ts'

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
```

> `describe` and `test` description supports a `string` or `{ given, should }` object

Run the test:

```shell
$ deno test demo/sample1.test.ts
Check file:///home/openhoat/dev/rnd/deno/stej/demo/sample1.test.ts
running 1 test from ./demo/sample1.test.ts
Sample1 ...
  isString ...
    given: a string
    should: return true ... ok (4ms)
    given: a number
    should: return false ... ok (3ms)
  isString ... ok (12ms)
Sample1 ... ok (18ms)

ok | 1 passed (3 steps) | 0 failed (30ms)

$ █
```

## License

The [MIT License](LICENSE)
