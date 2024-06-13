/**
 * @category Functor
 */
export class Maybe_F<T> {
  static of = <T>(x: T) => new Maybe_F<T>(x)
  public $value: T | null | undefined

  get isNothing() {
    return this.$value === null || this.$value === undefined
  }

  constructor($value: T | null | undefined) {
    this.$value = $value
  }

  map = <R>(fn: (value: T) => R): Maybe_F<R> => {
    return this.isNothing ?
        Maybe_F.of(this.$value as R)
      : Maybe_F.of(fn(this.$value as T))
  }
}

/**
 * @category Functor
 */
export const maybe = Object.assign(<T>(value: T) => new Maybe_F(value), {
  map:
    <T, R>(fn: (value: T) => R) =>
    (maybe: Maybe_F<T>) =>
      maybe.map(fn),
  value: <T>(maybe: Maybe_F<T>): T | null | undefined => maybe.$value,
})
