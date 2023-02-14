// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


// ============= Your Code Here =============
type ToArray<T extends string | number> = `${T}` extends `${infer A}${infer B}` ? [A, ...ToArray<B>] : T extends '' ? [] : [T];
type IsPalindrome<T extends string | number, A = ToArray<T>> = A extends [infer H, ...infer R extends string[], infer T] ? H extends T ? IsPalindrome<'', R> : false : true;
