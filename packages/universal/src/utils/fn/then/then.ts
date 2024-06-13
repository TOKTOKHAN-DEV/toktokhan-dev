import { curry } from 'lodash'

export const then: {
  <P, R>(fn: (p: P) => R, data: P | PromiseLike<P>): R
  <P, R>(fn: (p: P) => R): (data: P | PromiseLike<P>) => R
} = curry(<P, R>(fn: (p: P) => R, data: P | PromiseLike<P>) => {
  if (data instanceof Promise) {
    return data.then(fn)
  }
  return fn(data as P)
})
