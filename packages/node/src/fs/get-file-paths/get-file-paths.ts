import { globby } from 'globby'

/**
 * 주어진 파일 경로의 모든 하위 경로를 반환합니다.
 *
 * @category Utils/Fs
 * @param path - 파일 경로. 이 경로의 모든 하위 경로가 반환됩니다.
 *
 * @example
 * ```typescript
 * const paths = await getFilePaths('./src');
 * console.log(paths); // ['./src/index.ts', './src/utils.ts', ...]
 * ```
 */
export const getFilePaths = async (path: string) => await globby(path)
