// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

SimpleVue({
  data() {
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
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})


// ============= Your Code Here =============
type Computed<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : T[K]
}
type Options<D, C, M> = {
  data?: () => D
  computed?: C & ThisType<D & Computed<C>>
  methods?: M & ThisType<D & Computed<C> & M>
}
declare function SimpleVue<D, C, M>(options: Options<D, C, M>): any
