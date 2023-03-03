// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]


// ============= Your Code Here =============
type SumOne<S extends string> =
  S extends '99' ? [1, 8] :
  S extends '98' | '89' ? [1, 7] :
  S extends '97' | '88' | '79' ? [1, 6] :
  S extends '96' | '87' | '78' | '69' ? [1, 5] :
  S extends '95' | '86' | '77' | '68' | '59' ? [1, 4] :
  S extends '94' | '85' | '76' | '67' | '58' | '49' ? [1, 3] :
  S extends '93' | '84' | '75' | '66' | '57' | '48' | '39' ? [1, 2] :
  S extends '92' | '83' | '74' | '65' | '56' | '47' | '38' | '29' ? [1, 1] :
  S extends '19' | '28' | '37' | '46' | '55' | '64' | '73' | '82' | '91' ? [1, 0] :
  S extends '09' | '18' | '27' | '36' | '45' | '54' | '63' | '72' | '81' | '90' ? [0, 9] :
  S extends '08' | '17' | '26' | '35' | '44' | '53' | '62' | '71' | '80' ? [0, 8] :
  S extends '07' | '16' | '25' | '34' | '43' | '52' | '61' | '70' ? [0, 7] :
  S extends '06' | '15' | '24' | '33' | '42' | '51' | '60' ? [0, 6] :
  S extends '05' | '14' | '23' | '32' | '41' | '50' ? [0, 5] :
  S extends '04' | '13' | '22' | '31' | '40' ? [0, 4] :
  S extends '03' | '12' | '21' | '30' ? [0, 3] :
  S extends '02' | '11' | '20' ? [0, 2] :
  S extends '01' | '10' ? [0, 1] :
  S extends '00' ? [0, 0] :
  never
type AddOne<D extends [ 0|1, number ], L extends 1 | 0> = 
  L extends 0 ? D :
  D extends [0, 0] ? [0, 1] :
  D extends [0, 1] ? [0, 2] :
  D extends [0, 2] ? [0, 3] :
  D extends [0, 3] ? [0, 4] :
  D extends [0, 4] ? [0, 5] :
  D extends [0, 5] ? [0, 6] :
  D extends [0, 6] ? [0, 7] :
  D extends [0, 7] ? [0, 8] :
  D extends [0, 8] ? [0, 9] :
  D extends [0, 9] ? [1, 0] :
  D extends [1, 0] ? [1, 1] :
  D extends [1, 1] ? [1, 2] :
  D extends [1, 2] ? [1, 3] :
  D extends [1, 3] ? [1, 4] :
  D extends [1, 4] ? [1, 5] :
  D extends [1, 5] ? [1, 6] :
  D extends [1, 6] ? [1, 7] :
  D extends [1, 7] ? [1, 8] :
  D extends [1, 8] ? [1, 9] :
  never

type NumberToArray<N extends string | number | bigint> = `${N}` extends `${infer A}${infer B}` ? [...NumberToArray<B>, A] : []
type PadRight<A extends string[], C extends number = A['length']> = A['length'] extends C ? A : PadRight<[...A, '0'], C>
type Add<A1 extends string[], A2 extends string[], C extends string = '', L extends 1 | 0 = 0, D extends [ 0|1, number ] =
  AddOne<SumOne<`${A1[0]}${A2[0]}`>, L>> =
    A1 extends [infer _X1 extends string, ...infer R1 extends string[]] ?
    A2 extends [infer _X2 extends string, ...infer R2 extends string[]] ?
      Add<R1, R2, `${D[1]}${C}`, D[0]> : C : C
type TrimZero<S extends string> = S extends `0${infer R}` ? R extends '' ? '0' : TrimZero<R> : S
type Sum<A extends string | number | bigint, B extends string | number | bigint> =
  TrimZero<Add<PadRight<NumberToArray<A>, 20>,PadRight<NumberToArray<B>, 20>>>
