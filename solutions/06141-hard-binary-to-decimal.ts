// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]


// ============= Your Code Here =============
type BinaryToDecimal<S extends string, A extends number[] = []> =
  S extends `${infer H}${infer R}` ?
   H extends '1' ? BinaryToDecimal<R, [0, ...A, ...A]> :
   H extends '0' ? BinaryToDecimal<R, [...A, ...A]> : A['length'] : A['length']
