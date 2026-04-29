export function buildProjectMarkdown(input: {
  title: string;
  headlineOptions?: unknown;
  subheadlineOptions?: unknown;
  voScript?: string | null;
}) {
  const headlines = Array.isArray(input.headlineOptions)
    ? input.headlineOptions
    : [];
  const subheadlines = Array.isArray(input.subheadlineOptions)
    ? input.subheadlineOptions
    : [];

  return [
    `# ${input.title}`,
    "",
    "## Headline options",
    ...headlines.map((item) => `- ${String(item)}`),
    "",
    "## Subheadline options",
    ...subheadlines.map((item) => `- ${String(item)}`),
    "",
    "## VO Script",
    input.voScript || "",
  ].join("\n");
}
