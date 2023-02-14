// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]


// ============= Your Code Here =============
type Format<T extends string> = T extends `${infer _A}%%${infer B}` ? Format<B> : T extends `${infer _A}%${infer B}${infer C}` ? B extends 's' ? (s1: string) => Format<C> : B extends 'd' ? (d1: number) => Format<C> : never : T extends `${infer A}%%${infer B}` ? Format<`%${B}`> : T extends `${infer A}%%%${infer B}` ? (d1: number) => Format<`%${B}`> : T extends `${infer A}%${infer B}${infer C}` ? B extends 's' ? (s1: string) => Format<C> : B extends 'd' ? (d1: number) => Format<C> : never : T extends `${infer A}%${infer B}` ? B extends 's' ? (s1: string) => string : B extends 'd' ? (d1: number) => string : never : string
