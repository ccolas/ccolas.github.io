import { copyFile, mkdir, writeFile } from "node:fs/promises";

// Jekyll historically served these directory URLs. Astro's file-format build
// also emits project.html/blog.html, so keep directory indexes as aliases.
for (const route of ["project", "blog"]) {
  await mkdir(`dist/${route}`, { recursive: true });
  await copyFile(`dist/${route}.html`, `dist/${route}/index.html`);
}

const siteUrl = "https://cedriccolas.com";
const routes = [
  "/",
  "/contact",
  "/photographs",
  "/publications",
  "/project/",
  "/project/wikiexploration",
  "/project/charabia",
  "/project/color-evolution",
  "/project/cppnworld",
  "/project/chromatic-cartography",
  "/project/pianocktail",
  "/project/dirty-mixer",
  "/project/light-impressions",
  "/project/tangible-dreams",
  "/project/chit",
  "/blog/",
  "/archive/2022-09-13-emotional_playlist"
];
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`),
  "</urlset>",
  ""
].join("\n");

await writeFile("dist/sitemap.xml", sitemap);
await writeFile("dist/robots.txt", `Sitemap: ${siteUrl}/sitemap.xml\n`);
