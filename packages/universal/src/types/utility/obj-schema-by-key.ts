/**
 * 넘겨진 key 를 기반으로, 객체의 type 을 만들어 줍니다.
 *
 * @category Types/Utility
 *
 * @typeParam T - key 값
 * @typeParam Value - 해당 key 의 값의 타입 (default: any)
 *
 * @example
 * ```ts
 * type A = ObjSchemaByKey<'a.b.c'> // { a?: { b?: { c?: any } } }
 * type B = ObjSchemaByKey<'a.b.0.title'> // { a?: { b?: {title?: any}[] } }
 *
 */
export type ObjSchemaByKey<T extends string | number, Value = any> =
  T extends `${infer Key}.${infer Rest}` ?
    Key extends `${number}` ?
      ObjSchemaByKey<Rest, Value>[]
    : { [K in Key]?: ObjSchemaByKey<Rest, Value> }
  : { [K in T]?: Value }
