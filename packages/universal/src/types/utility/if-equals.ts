/**
 * 두 개의 타입이 동일한지를 확인하고, 동일하다면 지정된 타입으로, 그렇지 않다면 다른 타입으로 설정하는 타입을 정의합니다.
 *
 * @category Types/Utility
 *
 * @typeParam X - 비교할 첫 번째 타입
 * @typeParam Y - 비교할 두 번째 타입
 * @typeParam A - 두 타입이 동일한 경우의 반환 타입 (기본값: 첫 번째 타입)
 * @typeParam B - 두 타입이 동일하지 않은 경우의 반환 타입 (기본값: never)
 * @returns 두 타입이 동일한 경우 A 타입을, 그렇지 않은 경우 B 타입을 반환합니다.
 *
 * @example
 * ```typescript
 * // 두 타입이 동일한 경우
 * type Result1 = IfEquals<number, number, 'Equal', 'Not Equal'>;
 * // type Result1 = 'Equal'
 *
 * // 두 타입이 동일하지 않은 경우
 * type Result2 = IfEquals<number, string, 'Equal', 'Not Equal'>;
 * // type Result2 = 'Not Equal'
 * ```
 */
export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B
