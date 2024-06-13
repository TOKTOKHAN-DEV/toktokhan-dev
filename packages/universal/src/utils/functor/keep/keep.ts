import { curry } from 'lodash'

/**
 * @curried
 * @category Functor
 */
export class Keep_F<Kept, Value> {
  constructor(
    public kept: Kept,
    public value: Value,
  ) {
    this.kept = kept
    this.value = value
  }

  public of = <New>(value: New) => new Keep_F<Kept, New>(this.kept, value)

  public map = <New>(fn: (value: Value, kept: Kept) => New) =>
    this.of<New>(fn(this.value, this.kept))
}

/**
 * @category Functor
 */
export const keep: {
  <T>(kept: T): Keep_F<T, T>
  of: {
    <Kept, Value>(value: Value, keep: Keep_F<Kept, Value>): Keep_F<Kept, Value>
    <Kept, Value>(
      value: Value,
    ): (keep: Keep_F<Kept, Value>) => Keep_F<Kept, Value>
  }
  map: {
    <Kept, Prev, New>(
      fn: (value: Prev, kept: Kept) => New,
      keep: Keep_F<Kept, Prev>,
    ): Keep_F<Kept, New>
    <Kept, Prev, New>(
      fn: (value: Prev, kept: Kept) => New,
    ): (keep: Keep_F<Kept, Prev>) => Keep_F<Kept, New>
  }
  value: <Kept, Value>(keep: Keep_F<Kept, Value>) => Value
} = Object.assign(
  <T>(kept: T) => {
    return new Keep_F(kept, kept)
  },
  {
    of: curry(<Kept, Value>(value: Value, keep: Keep_F<Kept, Value>) =>
      keep.of(value),
    ),
    map: curry(
      <Kept, Prev, New>(
        fn: (value: Prev, kept: Kept) => New,
        keep: Keep_F<Kept, Prev>,
      ): Keep_F<Kept, New> => keep.map(fn),
    ),
    value: <Kept, Value>(keep: Keep_F<Kept, Value>): Value => keep.value,
  },
)
