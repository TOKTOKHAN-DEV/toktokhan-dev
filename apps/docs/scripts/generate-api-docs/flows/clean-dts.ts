import { existsSync, rmSync } from "fs";
import path from "path";

import { cwd } from "@toktokhan-dev/node";
import { removeStr } from "@toktokhan-dev/universal";

import { flow, forEach, map } from "lodash/fp";

import { packageHasDoc } from "../utils";

const removeDocDts = (packagePath: string) => {
  const docDtsPath = path.join(packagePath, "dist", "index.doc.d.ts");
  if (existsSync(docDtsPath)) {
    rmSync(docDtsPath);
  }
};

const pathLog = flow(map(removeStr(cwd())));

export const cleanDts = flow(packageHasDoc, forEach(removeDocDts, pathLog));
