import { Obj } from "@toktokhan-dev/universal";

import { flow } from "lodash";

import { readFileSync } from "../read-file-sync";

/**
 * 주어진 JSON 파일을 읽어 파싱하여 객체로 반환하는 함수입니다.
 *
 * @category Utils/Fs
 *
 * @typeParam T - 반환될 객체의 타입
 * @param path - 읽을 JSON 파일의 경로
 * @returns JSON 파일을 파싱한 객체
 *
 * @example
 * ```typescript
 * // JSON 파일을 읽어 객체로 반환하는 예시
 * const data = json<{ name: string; age: number }>('data.json');
 * ```
 */
export const json: <T extends Obj = Obj>(path: string) => T = flow(
  readFileSync("utf-8"),
  JSON.parse,
);
