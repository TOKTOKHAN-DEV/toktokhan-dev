export type DeepOmitReadOnly<T extends object | undefined> = Omit<
  {
    [P in keyof T]: NonNullable<T[P]> extends Array<infer I>
      ? I extends object
        ? null extends T[P]
          ? DeepOmitReadOnly<NonNullable<I>>[] | null
          : DeepOmitReadOnly<NonNullable<I>>[]
        : I[]
      : NonNullable<T[P]> extends object | undefined
      ? null extends T[P]
        ? DeepOmitReadOnly<NonNullable<T[P]>> | null
        : DeepOmitReadOnly<NonNullable<T[P]>>
      : T[P];
  },
  ReadonlyKeys<NonNullable<T>>
>;
export type OmitReadOnly<T extends object> = Omit<T, ReadonlyKeys<T>>;

export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends <T>() => T extends Y ? 1 : 2
  ? A
  : B;
