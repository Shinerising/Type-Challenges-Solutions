// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]


// ============= Your Code Here =============
type Primitive<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : never
type ToPrimitive<T> = {
  [K in keyof T]: T[K] extends number | string | boolean | symbol | bigint | undefined | null ? Primitive<T[K]> : ToPrimitive<T[K]>
}
