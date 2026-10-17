// Inhalte (content/) werden von Laien via Pages CMS gepflegt,
// Struktur und Layout (src/) nur von Entwicklern.
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("dokumente");
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

  return {
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "_site",
    },
    markdownTemplateEngine: false,
  };
}
