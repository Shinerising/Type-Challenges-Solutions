// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]


// ============= Your Code Here =============
type AllChar<T extends string, U = '', A = ''> = T extends `${infer H}${infer R}` ? H extends U ? AllChar<R, U, A | H> : AllChar<R, U | H, A> : A
type FirstUniqueCharIndex<T extends string, U = AllChar<T>, A extends unknown[] = []> =  T extends `${infer H}${infer R}` ? H extends U ? FirstUniqueCharIndex<R, U, [H, ...A]> : A['length'] : -1