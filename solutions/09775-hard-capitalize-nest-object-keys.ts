// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T> = T extends unknown[] ? T extends [infer U, ...infer R] ? [CapitalizeNestObjectKeys<U>, ... CapitalizeNestObjectKeys<R>] : [] : T extends object ? {
  [K in keyof T as K extends string ? Capitalize<K> : never]: CapitalizeNestObjectKeys<T[K]>
} : T
