import { readdirSync, writeFileSync } from "fs";

import { cwd, infoLog, pathOn, readFileSync } from "@toktokhan-dev/node";
import {
  createObjBySelector,
  isEvery,
  not,
  or,
  pass,
  removeStr,
} from "@toktokhan-dev/universal";

import {
  filter,
  find,
  flow,
  forEach,
  head,
  identity,
  isEqual,
  map,
  prop,
  reduce,
  replace,
  split,
  tail,
  trim,
} from "lodash/fp";

import { CategorizedItem, ScriptStore } from "../store";
import { extractTag, extractTags, isHeading2Start } from "../utils";

const DOC_PATH = "apps/docs/docs/api";

type ParsedTable = {
  title: string;
  head: string[];
  body: string[][];
};

type ParsedMd = {
  head: string;
  tables: ParsedTable[];
};

const cleanupTableStr: (str: string) => string = replace(/(\n|\r)/g, "");

const mdHead: (md: string) => string = flow(split("## "), head);

const mdTitles: (md: string) => string[] = flow(
  split("\n"),
  filter(isHeading2Start),
  map(flow(removeStr("##"), removeStr("\r"), trim)),
);

const mdTables: (md: string) => Omit<ParsedTable, "title">[] = flow(
  cleanupTableStr,
  extractTags("table"),
  map(
    createObjBySelector({
      head: flow(extractTag("thead"), extractTags("th")),
      body: flow(
        extractTag("tbody"),
        flow(extractTags("tr"), map(extractTags("td"))),
      ),
    }),
  ),
);

const groupTableWithTitle = (data: string): ParsedTable[] =>
  mdTitles(data).map((title, idx) => ({ title, ...mdTables(data)[idx] }));

const parseIndexMD: (md: string) => ParsedMd = createObjBySelector({
  head: mdHead,
  tables: groupTableWithTitle,
});

const renterTable = (table: ParsedTable): string => {
  return `
## ${table.title}

<table>
<thead>
<tr>
${table.head.map((v) => `<th>${v}</th>`).join("\n")}
</tr>
</thead>
<tbody>
${table.body.map((row) => `<tr>${row.map((v) => `<td>\n\n${v}\n\n</td>`).join("\n\n\n")}</tr>`).join("\n\n")}
</tbody>
</table>
`;
};

const renderMd = (data: ParsedMd): string => {
  return `${data.head}

${data.tables.map(renterTable).join("\n\n")}
`;
};

const indexingMdList = flow(
  pass(DOC_PATH),
  readdirSync,
  filter(
    flow(
      split("."),
      isEvery([
        flow(head, not(isEqual("index"))),
        flow(tail, not(isEqual("md"))),
        flow(prop("length"), isEqual(2)),
      ]),
    ),
  ),
);

const readOnDocPath = flow(
  pathOn(DOC_PATH),
  pathOn(cwd()),
  readFileSync("utf-8"),
);

const removeMd = removeStr(".md");

const isTargetTitle = (name: string) => (title: string) =>
  !!title.match(new RegExp(`\\[${name}(\\(.*\\))?\\].*`));

const getCategorizedByName = (name: string) =>
  flow(
    ScriptStore.getCategories,
    find(
      flow(flow(prop("name")), isEqual(removeMd(name)), (res) => {
        return res;
      }),
    ),
    prop("categorized"),
    or([]),
  )();

const updateMD = ({
  name,
  parsed,
  categorized,
}: {
  name: string;
  parsed: ParsedMd;
  categorized: CategorizedItem[];
}) => {
  return flow(
    pass(parsed.tables),
    reduce((prev: Record<string, any[]>, cur: ParsedTable) => {
      const updated = { ...prev };

      cur.body.forEach((row) => {
        const found = categorized.find((item) => {
          const isTarget = isTargetTitle(item.name);
          const res = cur.title !== item.category && isTarget(row[0]);

          return res;
        });

        if (!found) return;

        const category = found.category;
        infoLog(
          "move-category",
          `${found.name} of ${name} ${cur.title} -> ${category}`,
        );
        updated[category] = [...(updated[category] || []), row];
      });

      return updated;
    }, {}),
    (addedMap) => {
      const addedTable = Object.entries(addedMap).map(
        ([category, rows]): ParsedTable => {
          return {
            title: category,
            head: [category, "Description"],
            body: rows,
          };
        },
      );

      return {
        ...parsed,
        tables: [...addedTable].sort((a, b) => a.title.localeCompare(b.title)),
      };
    },
  )();
};

export const handleIndexMarkdown = flow(
  indexingMdList,
  forEach(
    flow(
      createObjBySelector({
        name: identity,
        parsed: flow(readOnDocPath, parseIndexMD),
      }),
      createObjBySelector({
        name: prop("name"),
        parsed: prop("parsed"),
        categorized: flow(prop("name"), getCategorizedByName),
      }),
      createObjBySelector({
        name: prop("name"),
        md: flow(updateMD, renderMd),
      }),
      ({ name, md }) => {
        writeFileSync(pathOn(DOC_PATH)(name), md);
        infoLog("update-category", name);
      },
    ),
  ),
  pass(""),
);
