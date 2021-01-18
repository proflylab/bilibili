import { format } from "../../deps.ts";

// deno-lint-ignore no-explicit-any
const bbJsonToSrt = (fileName: string, bbJson: any) => {
  let ripSub = "";
  // deno-lint-ignore no-explicit-any
  bbJson.body.map((item: any, index: any) => {
    const [fromSeconds, fromMs] = item.from.toString().split(".");
    const [toSeconds, toMs] = item.to.toString().split(".");
    const start = format(
      new Date(
        0,
        0,
        0,
        0,
        0,
        parseInt(fromSeconds),
        (parseInt(fromMs) || 0) *
          (fromMs === undefined
            ? 0
            : fromMs.length === 1
            ? 100
            : fromMs.length === 2
            ? 10
            : fromMs.length === 3
            ? 1
            : 0),
      ),
      "HH:mm:ss,SSS",
    );
    Deno.stat;
    const end = format(
      new Date(
        0,
        0,
        0,
        0,
        0,
        parseInt(toSeconds),
        (parseInt(toMs) || 0) *
          (toMs === undefined
            ? 0
            : toMs.length === 1
            ? 100
            : toMs.length === 2
            ? 10
            : toMs.length === 3
            ? 1
            : 0),
      ),
      "HH:mm:ss,SSS",
    );
    ripSub += `${index + 1}\r\n${start} --> ${end}\r\n${
      item.content.replace(/\n/g, "\\n")
    }\r\n\r\n`;
  });
  Deno.writeTextFileSync(fileName, ripSub);
};

export { bbJsonToSrt };
