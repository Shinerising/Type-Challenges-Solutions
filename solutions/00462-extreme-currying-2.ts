// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal< typeof curried1Return1, boolean>>,
  Expect<Equal< typeof curried1Return2, boolean>>,
  Expect<Equal< typeof curried1Return3, boolean>>,

  Expect<Equal< typeof curried2Return1, boolean>>,
  Expect<Equal< typeof curried2Return2, boolean>>,
  Expect<Equal< typeof curried2Return3, boolean>>,
  Expect<Equal< typeof curried2Return4, boolean>>,
  Expect<Equal< typeof curried2Return5, boolean>>,
  Expect<Equal< typeof curried2Return6, boolean>>,
  Expect<Equal< typeof curried2Return7, boolean>>,
  Expect<Equal< typeof curried2Return8, boolean>>,
  Expect<Equal< typeof curried2Return9, boolean>>,
  Expect<Equal< typeof curried2Return10, boolean>>,
]


// ============= Your Code Here =============
type SubArray<A extends unknown[], U extends unknown[][] = []> = A extends [infer F, ...infer R] ? SubArray<R, U['length'] extends 0 ? [[F]] : [[...U[0], F], ...U]> : U
type ExcludeArray<A extends unknown[], U extends unknown[] = []> = U extends [...A, ...infer R extends unknown[]] ? R : []
type CurringType<A extends unknown[], U extends any[], R extends any, T extends unknown[] = ExcludeArray<U, A>> = A['length'] extends 0 ? R : (...args: U) => CurringType<T, SubArray<T>, R>
declare function DynamicParamsCurrying<T extends Function>(fn: T): T extends (...args:infer A) => infer R ? CurringType<A, SubArray<A>[number], R> : never
const a = curried1
type b = ExcludeArray<[1] | [1,2],[1,2,3]>