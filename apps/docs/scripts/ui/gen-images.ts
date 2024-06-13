import { readdirSync, writeFileSync } from "fs";
import path from "path";

import { pathOn } from "@toktokhan-dev/node";
import {
  arrayToRecord,
  createObjBySelector,
  pass,
  removeStr,
} from "@toktokhan-dev/universal";

import { flow, map, prop, replace } from "lodash/fp";

const IMG_PATH = "static/img/ui";
const OUTPUT_PATH = "src/generated";

const indexingImg = flow(pass(IMG_PATH), readdirSync);
const replaceAll = (pattern: string, replacement: string) =>
  replace(new RegExp(pattern, "g"), replacement);

flow(
  indexingImg,
  map(
    flow(
      createObjBySelector({
        src: pathOn("img/ui"),
        alt: flow(removeStr(".webp")),
      }),
    ),
  ),
  arrayToRecord(
    flow(prop("alt"), replaceAll("-", "_"), (word) => word.toLocaleUpperCase()),
  ),
  (identity) => {
    const newFilePath = path.join(OUTPUT_PATH, "images.tsx");
    const content = `export const MY_IMAGES = ${JSON.stringify(identity)}`;

    return writeFileSync(newFilePath, content, "utf-8");
  },
)();
