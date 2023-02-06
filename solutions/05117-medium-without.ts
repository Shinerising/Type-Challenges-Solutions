// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type Without<T extends unknown[], U extends unknown[] | number> = T extends [infer C, ...infer R extends unknown[]] ? U extends unknown[] ? C extends U[number] ? Without<R, U> : [C, ...Without<R, U>] :  C extends U ? Without<R, U> : [C, ...Without<R, U>] : T