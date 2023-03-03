// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]


// ============= Your Code Here =============
type ToArray<N extends number, A extends unknown[] = []> = A['length'] extends N ? A : ToArray<N, [...A, 1]>
type Positive<N extends number, S extends number, M extends number = `${N}` extends `-${infer R extends number}` ? R : N> = M extends N ? N : ToArray<S> extends [...ToArray<M>, ...infer R] ? R['length'] : never
type StartSlice<Arr extends unknown[], Start extends number = 0, End extends number = Arr['length'], AS extends unknown[] = [], AE extends unknown[] = []> =
  [ AS['length'], AE['length'] ] extends [ Start, End ] ?
  AE extends [...AS, ...infer R] ? R : [] : Arr extends [infer A, ...infer B] ?
  StartSlice<B, Start, End, AS['length'] extends Start ? AS : [...AS, A], AE['length'] extends End ? AE : [...AE, A]> : []
type Slice<Arr extends unknown[], Start extends number = 0, End extends number = Arr['length'], AS extends unknown[] = [], AE extends unknown[] = []> = 
  StartSlice<Arr, Positive<Start, Arr['length']>, Positive<End, Arr['length']>>