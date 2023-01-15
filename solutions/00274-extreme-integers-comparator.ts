// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]


// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Sign<N extends number> = `${N}` extends `-${infer _R}` ? false : true;
type Format<N extends string | number | bigint> = `${N}` extends `${infer _U}${infer R extends string | number | bigint}` ? `0${Format<R>}` : `0`
type Abs<N extends number> = `${N}` extends `-${infer R extends number}` ? R : N;
type Digit<N extends number> = [0, 0 | 1, 0 | 1 | 2, 0 | 1 | 2 | 3, 0 | 1 | 2 | 3 | 4, 0 | 1 | 2 | 3 | 4 | 5, 0 | 1 | 2 | 3 | 4 | 5 | 6, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9][N]
type First<S extends string> = S extends `${infer U extends number}${infer R}` ? [U, R] : never

type ComparatorSameSize<A extends string, B extends string, A0 extends [number, string] = First<A>, B0 extends [number, string] = First<B>> =
  Digit<A0[0]> extends Digit<B0[0]> ?
  Digit<B0[0]> extends Digit<A0[0]> ?
  A0[1] extends '' ? Comparison.Equal :
  ComparatorSameSize<A0[1], B0[1]> : Comparison.Lower : Comparison.Greater;
type ComparatorSameSizeInverse<A extends string, B extends string, A0 extends [number, string] = First<A>, B0 extends [number, string] = First<B>> =
  Digit<A0[0]> extends Digit<B0[0]> ?
  Digit<B0[0]> extends Digit<A0[0]> ?
  A0[1] extends '' ? Comparison.Equal :
  ComparatorSameSizeInverse<A0[1], B0[1]> : Comparison.Greater : Comparison.Lower;

type Comparator<A extends number, B extends number> =
  A extends B ? Comparison.Equal :
  [Sign<A>, Sign<B>] extends [true, false] ? Comparison.Greater :
  [Sign<A>, Sign<B>] extends [false, true] ? Comparison.Lower :
  Sign<A> extends true ?
  Format<A> extends `${Format<B>}${infer _R extends number}` ? Comparison.Greater :
  Format<B> extends `${Format<A>}${infer _R extends number}` ? Comparison.Lower :
  ComparatorSameSize<`${A}`, `${B}`>
  :
  Format<A> extends `${Format<B>}${infer _R extends number}` ? Comparison.Lower :
  Format<B> extends `${Format<A>}${infer _R extends number}` ? Comparison.Greater :
  ComparatorSameSizeInverse<`${Abs<A>}`, `${Abs<B>}`>;