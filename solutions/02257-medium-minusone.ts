// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============
type StringMinusOne<T> =
  T extends '10' ? '9' : 
  T extends number ?
    `${T}` extends `${infer A}9` ? `${A}8` :
    `${T}` extends `${infer A}8` ? `${A}7` :
    `${T}` extends `${infer A}7` ? `${A}6` :
    `${T}` extends `${infer A}6` ? `${A}5` :
    `${T}` extends `${infer A}5` ? `${A}4` :
    `${T}` extends `${infer A}4` ? `${A}3` :
    `${T}` extends `${infer A}3` ? `${A}2` :
    `${T}` extends `${infer A}2` ? `${A}1` :
    `${T}` extends `${infer A}1` ? `${A}0` :
    `${T}` extends `${infer A}0` ? `${StringMinusOne<A>}9` : 
     never : never
type ParseInt<T extends string> = T extends `${infer D extends number}` ? D : never;
type MinusOne<T> =T extends 1 ? 0 : T extends 0 ? -1 : ParseInt<StringMinusOne<T>>;
