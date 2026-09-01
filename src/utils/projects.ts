import type { CollectionEntry } from "astro:content";

export function projectSlug(project: CollectionEntry<"projects">): string {
  const filename = project.id.split("/").at(-1) ?? project.id;
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replaceAll("_", "-");
}
