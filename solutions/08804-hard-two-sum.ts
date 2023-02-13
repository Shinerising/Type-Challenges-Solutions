// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]


// ============= Your Code Here =============
type Contains<T extends readonly any[], U> = T extends [infer V, ...infer R] ? V extends U ? true : Contains<R, U> : false
type Minus<X extends number, Y extends number, A0 extends number[] = [], A1 extends number[] = []> =
  X extends Y ? 0 :
  A0['length'] extends X ? A1['length'] extends Y ?
  A0 extends [...infer K, ...A1] ? K['length'] : 0 :
  Minus<X, Y, A0, [1, ...A1]> : Minus<X, Y, [1, ...A0], A1>
type TwoSum<T extends number[], U extends number> = U extends 0 ? false : T extends [infer V extends number, ...infer R extends number[]] ? Contains<R, Minus<U, V>> extends true ? true : TwoSum<R, U> : false
