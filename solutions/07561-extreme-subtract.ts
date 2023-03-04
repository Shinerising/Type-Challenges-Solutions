// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]


// ============= Your Code Here =============
// M => minuend, S => subtrahend
type NumberToArray<N extends number, U extends number[] = []> = U['length'] extends N ? U : NumberToArray<N, [...U, U['length']]>
type InclusiveRange<Lower extends number, Higher extends number, U extends number[] = NumberToArray<Lower>, R extends number[] = NumberToArray<Higher>> =
  R extends [...U, ...infer D] ? D : never
type Subtract<M extends number, S extends number, A = InclusiveRange<S, M>> = A extends unknown[] ? A['length'] : never
