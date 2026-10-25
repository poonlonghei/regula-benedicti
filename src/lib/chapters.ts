import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");
export interface ChapterSummary {
  slug: string;
  titles: Partial<Record<Lang, string>>;
}

export interface Chapter {
  slug: string;
  texts: Partial<Record<Lang, ChapterText>>;
  prev: ChapterSummary | null;
  next: ChapterSummary | null;
}

function readFile(lang: Lang, slug: string) {
  const file = path.join(CONTENT_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return matter(fs.readFileSync(file, "utf8"));
}

/** All chapter slugs: the union of file names across languages, sorted by name. */
export function getSlugs(): string[] {
  const slugs = new Set<string>();
  for (const lang of LANGS) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".md")) slugs.add(f.replace(/\.md$/, ""));
    }
  }
  return [...slugs].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

export function getChapterSummaries(): ChapterSummary[] {
  return getSlugs().map((slug) => {
    const titles: Partial<Record<Lang, string>> = {};
    for (const lang of LANGS) {
      const parsed = readFile(lang, slug);
      if (parsed) titles[lang] = String(parsed.data.title ?? slug);
    }
    return { slug, titles };
  });
}

async function toHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkHtml).process(markdown);
  return String(file);
}

export async function getChapter(slug: string): Promise<Chapter> {
  const summaries = getChapterSummaries();
  const i = summaries.findIndex((s) => s.slug === slug);

  const texts: Partial<Record<Lang, ChapterText>> = {};
  for (const lang of LANGS) {
    const parsed = readFile(lang, slug);
    if (!parsed) continue;
    texts[lang] = {
      lang,
      title: String(parsed.data.title ?? slug),
      html: await toHtml(parsed.content),
    };
  }

  return {
    slug,
    texts,
    prev: i > 0 ? summaries[i - 1] : null,
    next: i >= 0 && i < summaries.length - 1 ? summaries[i + 1] : null,
  };
}
