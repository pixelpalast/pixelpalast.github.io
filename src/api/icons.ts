import fs from "fs";
import path from "path";

export interface Icon {
  name: string;
  path: string;
}

export function getAll(dirPath: string, basePath = ""): Array<Icon> {
  const entries = fs.readdirSync(dirPath, {withFileTypes: true});
  let icons: Array<Icon> = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Wenn ein Ordner gefunden wird, rekursiv weiter durchsuchen
      icons = icons.concat(getAll(fullPath, relativePath));
    } else if (entry.name.endsWith(".svg")) {
      icons.push({
        name: path.parse(entry.name).name,
        path: `${dirPath.replace("./public", "")}/${relativePath}`, // Pfad relativ zum "public" Ordner
      });
    }
  }
  return icons;
}
