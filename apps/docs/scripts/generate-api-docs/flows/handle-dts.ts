import { existsSync, writeFileSync } from "fs";
import path from "path";

import * as babel from "@babel/core";
import generator from "@babel/generator";
import { TSDocConfiguration, TSDocParser } from "@microsoft/tsdoc";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";
import {
  cwd,
  findFileToTop,
  infoLog,
  json,
  pathOf,
  readFileSync,
} from "@toktokhan-dev/node";
import {
  createObjBySelector,
  effect,
  keep,
  or,
  pass,
  prefix,
  removeStr,
  suffix,
  updateObj,
} from "@toktokhan-dev/universal";

import {
  bind,
  every,
  filter,
  find,
  flow,
  forEach,
  head,
  isEqual,
  map,
  prop,
  trim,
  values,
} from "lodash/fp";

import { Categorized, CategorizedItem, ScriptStore } from "../store";
import { packageHasDoc } from "../utils";

/**
 * @description
 * 생성된 api-extractor json 파일중 parameterName에 개행문자가 포함된 경우 제거합니다.
 */

const DTS_PATH = path.join("dist", "index.d.ts");
const UPDATED_DTS_PATH = "index.doc.d.ts";

const t = babel.types;

const tsdocConfigFile: TSDocConfigFile = TSDocConfigFile.loadForFolder("./");

const tsdocConfiguration: TSDocConfiguration = new TSDocConfiguration();

tsdocConfigFile.configureParser(tsdocConfiguration);

const tsdocParser = new TSDocParser(tsdocConfiguration);

const dtsPath: (basePath: string) => string = pathOf(DTS_PATH);

const coverDtsPath: (originDtsPath: string) => string = flow(
  path.dirname,
  pathOf(UPDATED_DTS_PATH),
);

const isCategory: (block: any) => boolean = flow(
  prop("blockTag.tagName"),
  isEqual("@category"),
);

const isPlainText: (node: any) => boolean = flow(
  prop("kind"),
  isEqual("PlainText"),
);

const parseAst = (path: string) => {
  return babel.parseSync(readFileSync("utf-8", path), {
    filename: path,
    presets: ["@babel/preset-typescript"],
    ast: true,
  });
};

const traverseAst =
  (visitor: Parameters<typeof babel.traverse>[1]) =>
  (source: Parameters<typeof babel.traverse>[0]) => {
    babel.traverse(source, visitor);
    return source;
  };

const printAst: (ast: babel.BabelFileResult) => string = flow(
  generator,
  prop("code"),
);

const updateAst = traverseAst({
  TSTypeLiteral: (path) => {
    const { node } = path;
    const isCurried = node.members.every(
      (member) => member.type === "TSCallSignatureDeclaration",
    );
    if (!isCurried) return;

    const firstSignature = node.members.find(
      (member) => member.type === "TSCallSignatureDeclaration",
    );

    if (!firstSignature) return;

    const newFunctionType = t.tsFunctionType(
      (firstSignature as any).typeParameters,
      (firstSignature as any).parameters,
      (firstSignature as any).typeAnnotation,
    );

    path.replaceWith(newFunctionType);
  },
});

const extractCategory: (comment: string) => string = flow(
  flow(prefix("/**\n"), suffix("\n*/")),
  bind(tsdocParser.parseString, tsdocParser),
  prop("docComment.customBlocks"),
  flow(find(isCategory), prop("content.nodes"), head, prop("nodes")),
  flow(find(isPlainText), prop("text"), trim),
);

const extractName = (node: any) => {
  if (node?.id?.name) return node.id.name;
  const declationName = node?.declarations?.find?.((n: any) => n?.id?.name).id
    .name;
  if (declationName) return declationName;
};

const categorizeDeclationsFromAst: (ast: any) => CategorizedItem[] = flow(
  prop("program.body"),
  map(
    createObjBySelector({
      category: flow(prop("leadingComments[0].value"), extractCategory),
      name: extractName,
    }),
  ),
  filter(flow(values, every(Boolean))),
);

type PackaedAstWithDtsPath = {
  ast: any;
  code: string;
  dts: string;
};

const packAstWithDtsPath = (
  astList: any[],
  dts: string[],
): PackaedAstWithDtsPath[] => {
  return astList.map((ast, i) => {
    return { ast, code: printAst(ast), dts: coverDtsPath(dts[i]) };
  });
};

const categorize: (data: PackaedAstWithDtsPath[]) => Categorized = map(
  createObjBySelector({
    dts: flow(prop("dts"), removeStr(cwd())),
    categorized: flow(prop("ast"), categorizeDeclationsFromAst),
    name: flow(
      prop("dts"),
      (dts) => findFileToTop(path.dirname(dts), "package.json"),
      json,
      prop("name"),
      removeStr("@toktokhan-dev/"),
      or("unknown"),
    ),
  }),
);

const rewriteDts = ({ code, dts }: PackaedAstWithDtsPath) => {
  writeFileSync(dts, code);
};

const addPkgDocComment = updateObj<any, any>("code", (prev, origin) => {
  return (
    getPkgDocComment(origin) +
    "\n\n" +
    prev.replace(getPkgDocComment(origin), "").trim()
  );
});

const readOnPackageDoc = flow(
  prop("dts"),
  removeStr("/dist/index.doc.d.ts"),
  pathOf("src/index.ts"),
  existsSync && readFileSync("utf-8"),
);

const extractPkgDocComment = (content: string) => {
  const packageDocComment = content.match(
    /\/\*\*[\s\S]+?@packageDocumentation[\s\S]+?\*\//,
  );
  return packageDocComment ? packageDocComment[0] : null;
};

const getPkgDocComment = flow(readOnPackageDoc, extractPkgDocComment);

export const handleDts = flow(
  flow(packageHasDoc, map(dtsPath), filter(existsSync)),
  keep,
  keep.map(map(flow(parseAst, updateAst))),
  keep.map(packAstWithDtsPath),
  keep.value,
  effect(
    flow(
      categorize, //
      ScriptStore.setCategories,
      () => infoLog("set categorized data", ""),
    ),
  ),
  forEach(
    flow(
      addPkgDocComment,
      effect(rewriteDts), //
      prop("dts"),
      infoLog("update-doc-dts"),
    ),
  ),
  pass(""),
);
