// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============
type CamelCase<S extends string, T = Lowercase<S>> = T extends `${infer F}_${infer R}` ? `${F}${Capitalize<CamelCase<R>>}` : T
type Camelize<T> = T extends unknown[] ? T extends [infer U, ...infer R] ? [Camelize<U>, ... Camelize<R>] : [] : T extends object ? {
  [K in keyof T as K extends string ? CamelCase<K> : never]: Camelize<T[K]>
} : T
