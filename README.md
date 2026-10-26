# Regula Sancti Benedicti · The Rule of St. Benedict · 聖本篤會規

A small static site (Next.js + TypeScript + Markdown) showing the Rule in Latin, English and Chinese side by side.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Adding a chapter

Each chapter is one Markdown file per language, with the **same file name** in each folder:

```
content/
  la/02.md
  en/02.md
  zh/02.md
```

Each file starts with a title, then the text:

```markdown
---
title: "Chapter 2: What Kind of Man the Abbot Ought to Be"
---

First paragraph.

Second paragraph.
```

- Chapters are sorted by file name (`00-prologue`, `01`, `02` … `73`), so use two digits.
- If a language is missing for a chapter, that column shows "Not yet added."
- Verse numbers or notes can be written in normal Markdown (`**1.** text`, `> quotation`).

## Deploying to GitHub Pages

- User/organisation site (`user.github.io`): `npm run build`, publish `out/`.
- Project site (`user.github.io/repo`): `BASE_PATH=/repo npm run build`.

## Layout

- `src/lib/chapters.ts` reads and renders the Markdown
- `src/components/ChapterReader.tsx` language toggle and side-by-side columns
- `src/app/` pages (home list, `chapters/[slug]`)
- `src/app/globals.css` all styling
