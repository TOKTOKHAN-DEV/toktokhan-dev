import { readdirSync, writeFileSync } from "fs";

import { infoLog, json, pathOn } from "@toktokhan-dev/node";
import { keep, pass, removeStr, updateObj } from "@toktokhan-dev/universal";

import { flow, map } from "lodash/fp";

/**
 * @description
 * 생성된 api-extractor json 파일중 parameterName에 개행문자가 포함된 경우 제거합니다.
 */
export const handleApiExtractorJson = flow(
  pass(readdirSync("apps/docs/api-extractor")),
  map(
    flow(
      pathOn("apps/docs/api-extractor"),
      keep,
      keep.map(
        flow(
          json<{ members: any[] }>,
          updateObj(
            "members",
            map(
              updateObj(
                "members",
                map(
                  flow(
                    updateObj<any, any>(
                      "parameters",
                      map(flow(updateObj("parameterName", removeStr("\n")))),
                    ),
                    updateObj<any, any>(
                      "docComment",
                      removeStr(/(\*)? @category\s+\S+\n/g),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      keep.map((v, kept) => {
        writeFileSync(kept, JSON.stringify(v, null, 2));
        return kept;
      }),
      keep.map(infoLog("cover")),
    ),
  ),
  pass(""),
);
