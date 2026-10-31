// Inhalte (content/) werden von Laien via Pages CMS gepflegt,
// Struktur und Layout (src/) nur von Entwicklern.
import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Setzt pathPrefix vor alle Pfade, die mit "/" beginnen – auch in Texten aus dem CMS
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("dokumente");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  eleventyConfig.ignores.add("AGENTS.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("ANLEITUNG.md");

  // Nur sichtbare Leitungspersonen, sortiert nach Feld "reihenfolge"
  eleventyConfig.addCollection("leitungSichtbar", (api) =>
    api
      .getFilteredByTag("leitung")
      .filter((p) => p.data.anzeigen !== false)
      .sort((a, b) => (a.data.reihenfolge ?? 0) - (b.data.reihenfolge ?? 0))
  );

  // Rich-Text in Abschnitte (je ab einer Zwischenüberschrift) aufteilen, damit sie als Karten erscheinen
  eleventyConfig.addFilter("abschnitte", (html) =>
    html
      .split(/(?=<h2)/)
      .filter((s) => s.trim())
      .map((s) => `<section class="abschnitt">${s}</section>`)
      .join("\n")
  );

  return {
    // Auf GitHub Pages liegt die Seite unter /musiwo-website1/, auf musiwo.ch unter /
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "_site",
    },
    markdownTemplateEngine: false,
  };
}
