// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]


// ============= Your Code Here =============
type UnionReplace<T, U extends [unknown, unknown][]> =
  U extends [[infer A, infer B], ...infer C extends [unknown, unknown][]] ?
  UnionReplace<T extends A ? B : T, C> : T
