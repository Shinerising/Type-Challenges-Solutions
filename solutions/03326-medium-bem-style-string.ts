// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


// ============= Your Code Here =============
type Combine<S extends string, A extends string[], C extends string> = A extends [] ? [S] : A extends [infer U extends string, ...infer R extends string[]] ? R extends [] ? [`${S}${C}${U}`] : [`${S}${C}${U}`, ...Combine<S, R, C>] : []
type BEMA<B extends string, E extends string[], M extends string[], V extends string[] = Combine<B, E, "__">> = V extends [infer U extends string, ...infer R extends string[]] ? [...Combine<U, M, "--">, ...BEMA<B,E,M,R>] : V
type BEM<B extends string, E extends string[], M extends string[]> = BEMA<B, E, M>[number]
