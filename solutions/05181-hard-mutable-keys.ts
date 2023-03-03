// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]


// ============= Your Code Here =============
type IsReadonly<T> = T extends any ? [T] extends [Readonly<T>] ? true : false : false
type MutableKeys<T> = {
  [K in keyof T as IsReadonly<K> extends true ? K : never]: T[K]
}
type c = { a: number; readonly b: string }
type d = IsReadonly<c>
type a = MutableKeys<{ a: number; readonly b: string }>