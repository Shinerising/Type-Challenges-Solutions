// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]


// ============= Your Code Here =============
type Push<T, S extends unknown[]> = S extends [infer U extends unknown[], ...infer R] ? [[...U, T], ...Push<T, R>] : S
type SubsequenceArray<T extends unknown[], S extends unknown[] = [[]]> = T extends [infer U, ...infer R] ? SubsequenceArray<R, [...S, ...Push<U, S>]> : S
type Subsequence<T extends unknown[]> = SubsequenceArray<T>[number]