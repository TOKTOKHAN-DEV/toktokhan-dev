import { $ } from "@toktokhan-dev/node";

export const buildApiExtractorJson = () =>
  new Promise((resolve, reject) =>
    $("turbo", ["api-extractor"], {
      stdio: "ignore",
    })
      .on("close", resolve)
      .on("error", reject),
  );
