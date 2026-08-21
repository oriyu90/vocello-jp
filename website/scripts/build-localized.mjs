#!/usr/bin/env node

import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const websiteRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicRoot = path.join(websiteRoot, "public");
const outputRoot = path.join(websiteRoot, "dist");
const canonicalRoot = "https://studio-rizi.pages.dev/projects/vocello-jp/";
const publicBase = "/projects/vocello-jp/";

async function copy(relativePath) {
  const destination = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(publicRoot, relativePath), destination);
}

function useJapaneseRoot(html) {
  return html.replaceAll(`${publicBase}ja/`, publicBase);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of [
  "localized.css",
  "localized.js",
  "assets/app-icon-1024.png",
  "assets/screens/custom-voice.png",
  "privacy/index.html",
]) {
  await copy(file);
}

const japanese = useJapaneseRoot(await readFile(path.join(publicRoot, "ja/index.html"), "utf8"));
if (!japanese.includes(`<link rel="canonical" href="${canonicalRoot}">`)) {
  throw new Error("The localized Japanese root is missing its canonical URL.");
}
await writeFile(path.join(outputRoot, "index.html"), japanese);

for (const language of ["en", "zh", "pt"]) {
  const html = useJapaneseRoot(
    await readFile(path.join(publicRoot, `${language}/index.html`), "utf8"),
  );
  const directory = path.join(outputRoot, language);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

const outputFiles = [
  "index.html",
  "en/index.html",
  "zh/index.html",
  "pt/index.html",
  "privacy/index.html",
  "localized.css",
  "localized.js",
  "assets/app-icon-1024.png",
  "assets/screens/custom-voice.png",
];
console.log(`Localized Vocello JP site built: ${outputFiles.length} files`);
