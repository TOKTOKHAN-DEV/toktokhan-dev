import { $ } from "@toktokhan-dev/node";

export const buildPackages = () =>
  new Promise((resolve, reject) =>
    $("pnpm", ["build:packages"], {
      stdio: "inherit",
    })
      .on("close", resolve)
      .on("error", reject),
  );
