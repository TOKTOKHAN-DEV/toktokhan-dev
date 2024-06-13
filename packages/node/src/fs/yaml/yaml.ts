import { Obj } from "@toktokhan-dev/universal";

import { flow } from "lodash";
import { parse } from "yaml";

import { readFileSync } from "../read-file-sync";

/**
 * YAML 파일을 읽어 파싱하여 객체로 반환하는 함수입니다.
 *
 * @category Utils/Fs
 *
 * @typeParam T - 반환될 객체의 타입
 * @param path - 읽을 YAML 파일의 경로
 * @returns YAML 파일을 파싱한 객체
 * @example
 * ```typescript
 * // YAML 파일을 읽어 객체로 반환하는 예시
 * const data = yaml<{ name: string; age: number }>('data.yaml');
 * ```
 */
export const yaml: <T extends Obj = Obj>(path: string) => T = flow(
  readFileSync("utf-8"),
  parse,
);
