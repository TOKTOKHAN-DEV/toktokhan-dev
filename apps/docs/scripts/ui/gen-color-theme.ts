import { writeFileSync } from "fs";
import path from "path";

import {
  createObjBySelector,
  prefix,
  removeStr,
  suffix,
} from "@toktokhan-dev/universal";

import { entries, flow, map, prop, replace } from "lodash/fp";

import { themeColors } from "../../static/color-tokens";

type Key = "light" | "dark" | "config";

const TAILWIND_OUTPUT_PATH = "src/generated";
const CSS_OUTPUT_PATH = "src/generated";

const tailwindFilePath = path.join(
  TAILWIND_OUTPUT_PATH,
  "color-theme-tailwind.ts",
);
const cssFilePath = path.join(CSS_OUTPUT_PATH, "color-theme.css");

const getKey = flow(prefix("--"), replace(/\./g, "-"));
const getConfigValue = flow(replace(/\./g, "-"), prefix("var(--"), suffix(")"));

const newColors = flow(
  entries,
  map(
    flow(
      createObjBySelector({
        light: (identity) =>
          removeStr(`'`)(`${getKey(identity[0])}:${identity[1]["light"]};`),
        dark: (identity) =>
          removeStr(`'`)(`${getKey(identity[0])}:${identity[1]["dark"]};`),
        config: (identity) =>
          removeStr(`'`)(`${identity[0]}:${getConfigValue(identity[0])}`),
      }),
    ),
  ),
  createObjBySelector({
    light: map(prop("light")),
    dark: map(prop("dark")),
    config: map(prop("config")),
  }),
)(themeColors);

const arrayToObj = (array: any[]) =>
  array.reduce((obj, item) => {
    const [key, value] = item.split(":");
    obj[key] = value;
    return obj;
  }, {});

const getCssColors = (newColors: Record<Key, string[]>) => {
  const contents = Object.entries(newColors).map(([key, val]) => {
    const cssObj = arrayToObj(val);
    const cssStr = Object.entries(cssObj)
      .map(([k, v]) => `${k}: ${v}`)
      .join("; ");

    switch (key) {
      case "light":
        return `:root { ${cssStr} }`;
      case "dark":
        return `[data-theme='dark'] { ${cssStr} }`;
      default:
        return null;
    }
  });

  return contents.filter((c) => !!c).join("\n");
};
const tokColor = arrayToObj(newColors.config);
const tailwindColors = `export const tokColor = ${JSON.stringify(tokColor, null, 2)}`;
const cssColors = getCssColors(newColors);

writeFileSync(tailwindFilePath, tailwindColors, "utf-8");
writeFileSync(cssFilePath, cssColors, "utf-8");
