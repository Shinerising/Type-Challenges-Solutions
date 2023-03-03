// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============
namespace RLE {
  export type Encode<S extends string, R extends string = '', D extends string[] = [], C extends string = ''> =
    S extends `${infer A}${infer B}` ?
      A extends C ?
        Encode<B, R, [C, ...D], C> :
          D['length'] extends 0 ? Encode<B, `${R}`, [A], A> :
          D['length'] extends 1 ?
            Encode<B, `${R}${D[0]}`, [A], A> :
            Encode<B, `${R}${D['length']}${D[0]}`, [A], A> :
      D['length'] extends 0 ? R :
      D['length'] extends 1 ? `${R}${D[0]}`: `${R}${D['length']}${D[0]}`
  type ArrayJoin<T extends [string, number], U extends string[] = [T[0]], S extends string = `${T[0]}`> = U['length'] extends T[1] ? S : ArrayJoin<T, [...U, T[0]], `${S}${T[0]}`>
  export type Decode<S extends string, R extends string = '', D extends [string, number][] = []> =
    S extends '' ?
      D extends [[infer A extends string, infer B extends number], ...infer C extends [string, number][]] ?
        Decode<'', `${R}${ArrayJoin<[A, B]>}`, C> : R :
    S extends `${infer A extends number}${infer B extends string}${infer C}` ?
      Decode<C, R, [...D, [B, A]]> :
      S extends `${infer A extends string}${infer B}` ?
        Decode<B, R, [...D, [A, 1]]> : Decode<'', R, D>
}
