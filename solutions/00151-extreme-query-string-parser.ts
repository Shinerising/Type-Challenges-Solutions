// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]


// ============= Your Code Here =============
type Combine<T, V, K extends string> = { [Key in K | keyof T]: Key extends keyof T ? Key extends K ? T[Key] extends unknown[] ? V extends T[Key][number] ? T[Key] : [...T[Key], V] : V extends T[Key] ? T[Key] : [T[Key], V] : T[Key] : V }
type ParseQueryString<S extends string, T extends Record<string, unknown> = {}> =
  S extends '' ? T :
  S extends `${infer K}&${infer R}` ?
  S extends `${infer K}=${infer V}&${infer R}` ?
    ParseQueryString<R, Combine<T, V, K>> :
    ParseQueryString<R, Combine<T, true, K>> :
  S extends `${infer K}=${infer V}` ?
    ParseQueryString<'', Combine<T, V, K>> :
  S extends `${infer K}` ?
    ParseQueryString<'', Combine<T, true, K>> :
  T
