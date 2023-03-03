// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})


// ============= Your Code Here =============
type Computed<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : T[K]
}
type ClassToType<C> = C extends () => infer T ? T
  : C extends unknown[] 
    ? ClassToType<C[number]>
    : C extends new (...args: any) => any
      ? InstanceType<C>
      : never
type GetType<T> = {
  [K in keyof T]: {} extends T[K] ? any : T[K] extends { type: infer R } ? ClassToType<R> : ClassToType<T[K]>
}
type Options<P, D, C, M> = {
  props: P,
  data?: (this:GetType<P>) => D
  computed?: C & ThisType<GetType<P> & D & Computed<C>>
  methods?: M & ThisType<GetType<P> & D & Computed<C> & M>
}
declare function VueBasicProps<P, D, C, M>(options: Options<P, D, C, M>): any