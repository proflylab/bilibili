import { cac, path } from "../deps.ts";
import { bbJsonToSrt } from "./utils/index.ts";

const cli = cac("bilibili");

cli
  .command("info <sId>", "View info")
  .action(async (sId, options) => {
    const res = await fetch(
      `https://api.global.bilibili.com/intl/gateway/v2/ogv/view/app/season?&season_id=${sId}`,
    );
    // deno-lint-ignore camelcase
    const { result: { season_id, title, evaluate, modules } } = await res
      .json();

    console.log(`[${season_id}] ${title}`);
    console.log(`[Description]\r\n${evaluate}`);
    console.log("[Eposodes]");
    // deno-lint-ignore no-explicit-any
    modules[0].data.episodes.map((item: { title: any; id: any }) => {
      console.log(`(${item.title}) - [${item.id}]`);
    });
  });

cli
  .command("get <epId>", "Get subtitle")
  .action(async (epId, options) => {
    const res = await fetch(
      `https://api.global.bilibili.com/intl/gateway/m/subtitle?ep_id=${epId}`,
    );
    const { data: { subtitles } } = await res.json();

    // deno-lint-ignore no-explicit-any
    subtitles.map(async (item: any) => {
      const { key, url } = item;
      const dest = `[${key}] ${path.basename(url).replace(".json", ".srt")}`;
      const res = await fetch(url);
      const data = await res.json();
      bbJsonToSrt(dest, data);
      console.log(dest);
    });
  });

cli
  .command("list", "Lists of anime")
  .action(async () => {
    const res = await fetch(
      "https://api.global.bilibili.com/intl/gateway/v2/ogv/season/index/result?&build=1000210&c_locale=&mobi_app=bstar_a&order=0&page=1&pagesize=1&platform=android&s_locale=en_TH",
    );
    const { data: { total } } = await res.json();
    const round = Math.ceil(total / 100);

    for (let page = 0; page < round; page++) {
      const res = await fetch(
        `https://api.global.bilibili.com/intl/gateway/v2/ogv/season/index/result?&build=1000210&c_locale=&mobi_app=bstar_a&order=0&page=${page}&pagesize=100&platform=android&s_locale=en_TH`,
      );
      const { data: { list } } = await res.json();

      // deno-lint-ignore no-explicit-any
      list.map((item: any) => console.log(`[${item.season_id}] ${item.title}`));
    }
  });
cli.help();

cli.version("0.0.2");

cli.parse();
