// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============
type NumberToArray<N extends number, A extends number[] = []> = N extends A['length'] ? A : NumberToArray<N, [...A, 0]>
type MaximumArray<T extends number[], C extends number[] = []> =
  T extends [] ? C :
  T extends [infer H extends number, ...infer R extends number[]] ?
  NumberToArray<H> extends [...infer A extends number[], ...C] ?
  MaximumArray<R, [...A, ...C]> : MaximumArray<R, C> : C
type Maximum<T extends number[]> = T extends [] ? never : MaximumArray<T>['length']
