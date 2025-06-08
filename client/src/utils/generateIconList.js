import { readFile, writeFile } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dtsPath = resolve(
  __dirname,
  "node_modules",
  "react-icons",
  "fa",
  "index.d.ts"
);

readFile(dtsPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading icon declaration file:", err);
    return;
  }

  const iconRegex = /export\s+declare\s+const\s+(Fa\w+)\s*:\s*IconType;/g;
  const icons = [];
  let match;

  while ((match = iconRegex.exec(data)) !== null) {
    icons.push(match[1]);
  }

  const outputPath = resolve(__dirname, "fa-icons.json");
  writeFile(outputPath, JSON.stringify(icons, null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error writing icon list:", writeErr);
    } else {
      console.log(
        `Icon list saved to ${outputPath}, total icons: ${icons.length}`
      );
    }
  });
});
