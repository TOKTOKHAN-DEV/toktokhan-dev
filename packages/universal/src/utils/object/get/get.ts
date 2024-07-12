import { curry } from 'lodash/fp'

import { DeepKeyOf, DeepValueOf, Obj, ObjSchemaByKey } from '../../../types'

/**
 * 객체의 property 를 key 로 받아서 값을 가져오는 함수입니다.
 * 중접 객체의 경우 a.b.c 와 같이, 배열의 경우 a.0.b 와 같이 접근이 가능합니다.
 *
 *
 * @category Utils/Fn
 *
 * @typeParam T - 객체의 타입
 * @typeParam K - 객체의 key
 * @param key - 객체의 key
 * @param data - 객체 혹은 배열
 * @returns 객체의 key 에 해당하는 값
 *
 * @example
 * ```ts
 *
 * const data = {
 *  user: {
 *    name: 'John Doe',
 *    address: {
 *      city: 'New York',
 *  },
 *  posts: [
 *    { title: 'Post 1' },
 *    { title: 'Post 2' },
 *  ],
 * }
 *
 * // 객체의 key 에 해당하는 값 가져오기
 * get('user.name', data) // 'John Doe'
 * get('user.address.city', data) // 'New York'
 *
 * // 배열의 key 에 해당하는 값 가져오기
 * get('posts.0.title', data) // 'Post 1'
 *
 * // curried function 으로 사용하기
 * const getUserName = get('user.name')
 * getUserName(data) // 'John Doe'
 *
 * const logname = flow(get('user.name'), console.log)
 * logname(data) // 'John Doe'
 *
 * const name = useStore(get('user.name')) // 'John Doe'
 *
 * ```
 */
export const get: {
  <T extends Obj | Array<any>, K extends DeepKeyOf<T>>(
    key: K,
    data: T,
  ): DeepValueOf<T, K>
  <T extends Obj | Array<any>, K extends DeepKeyOf<T> = DeepKeyOf<T>>(
    key: K,
  ): <_T extends ObjSchemaByKey<K>>(data: _T) => DeepValueOf<_T, K>
} = curry((key: string, data: unknown): unknown => {
  if (typeof key !== 'string') throw new Error('key must be string')
  if (typeof data !== 'object') throw new Error('data must be object')

  let result: any = data
  key.split('.').forEach((k) => {
    result = result?.[k as keyof typeof result]
  })

  return result
})
