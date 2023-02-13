// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]


// ============= Your Code Here =============
type Split<S extends string, H extends string = ''> =
  S extends `${infer F}${infer R}` ?
  F extends Uppercase<F> ?
  F extends Lowercase<F> ?
  [`${H}${F}`, R] : Split<R, `${H}${F}`> : Split<R, `${H}${F}`> : [H]
type CapitalizeWords<S extends string> = Split<S> extends [infer F extends string, infer R extends string] ? `${Capitalize<F>}${CapitalizeWords<R>}` : Capitalize<S>
