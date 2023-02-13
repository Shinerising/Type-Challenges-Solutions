// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
type ToArray<T extends number, U extends number[] = []> = U['length'] extends T ? [T, ...U] : ToArray<T,[U['length'], ...U]>
type Length<T extends number[]> = T['length']
type Fragment<T extends number[], U extends number> = U extends 0 ? [] : U extends 1 ? [1] : T extends [unknown, infer B extends number, ...infer R extends number[]] ? [...Fragment<[B,...R], B>, ...Fragment<R, R[0]>] : never
type Fibonacci<T extends number, U extends number[] = ToArray<T>> = Length<Fragment<U, T>>