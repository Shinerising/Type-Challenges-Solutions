// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
type ToArray<T extends number, U extends unknown[] = []> = T extends U['length'] ? [T, ...U] : ToArray<T,[U['length'], ...U]>
type Length<T extends number[]> = T['length']
type Fragment<T extends number[]> = T[0] extends 0 ? [] : T[0] extends 1 ? [1] : T extends [unknown, infer B extends number, ...infer R extends number[]] ? [...Fragment<[B,...R]>, ...Fragment<R>] : never
type Fibonacci<T extends number> = Length<Fragment<ToArray<T>>>