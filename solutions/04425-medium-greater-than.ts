// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]


// ============= Your Code Here =============

type Format<N extends string | number | bigint> = `${N}` extends `${infer _U}${infer R extends string | number | bigint}` ? `0${Format<R>}` : `0`
type Digit<N extends number> = [0, 0 | 1, 0 | 1 | 2, 0 | 1 | 2 | 3, 0 | 1 | 2 | 3 | 4, 0 | 1 | 2 | 3 | 4 | 5, 0 | 1 | 2 | 3 | 4 | 5 | 6, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9][N]
type First<S extends string> = S extends `${infer U extends number}${infer R}` ? [U, R] : never

type ComparatorSameSize<A extends string, B extends string, A0 extends [number, string] = First<A>, B0 extends [number, string] = First<B>> =
  Digit<A0[0]> extends Digit<B0[0]> ?
  Digit<B0[0]> extends Digit<A0[0]> ?
  A0[1] extends '' ? false :
  ComparatorSameSize<A0[1], B0[1]> : false : true;

type Comparator<A extends number, B extends number> =
  Format<A> extends `${Format<B>}${infer _R extends number}` ? true :
  Format<B> extends `${Format<A>}${infer _R extends number}` ? false :
  ComparatorSameSize<`${A}`, `${B}`>

type GreaterThan<T extends number, U extends number> = Comparator<T, U>
