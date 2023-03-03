// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============
type UnionToIntersection<T> = (T extends any ? (arg: T) => any : never) extends (arg: infer R) => any ? R : never
type DeepPickUnion<T, K extends string> =
  K extends `${infer A extends string}.${infer B extends string}` ?
  A extends keyof T ?
  { [Key in A] : DeepPick<T[A], B>} : never :
  K extends keyof T ?
  { [Key in K] : T[K] } : never
type DeepPick<T, K extends string> = UnionToIntersection<DeepPickUnion<T, K>>