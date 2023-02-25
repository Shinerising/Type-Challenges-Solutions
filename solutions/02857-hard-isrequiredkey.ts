// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]


// ============= Your Code Here =============
type GetRequired<T> = {[K in keyof T as {} extends Pick<T, K> ? never : K]: T[K]}
type RequiredKeys<T> = keyof GetRequired<T>
type IsRequiredKey<T, K extends keyof T> = Equal<RequiredKeys<T>, K>
