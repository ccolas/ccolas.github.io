import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://cedriccolas.com",
  output: "static",
  build: {
    format: "file"
  },
  markdown: {
    syntaxHighlight: false
  }
});
