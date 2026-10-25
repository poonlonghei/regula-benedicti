import Link from "next/link";
import { notFound } from "next/navigation";
import ChapterReader from "@/components/ChapterReader";
import { getChapter, getSlugs, LANGS } from "@/lib/chapters";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = await getChapter(slug);
  if (Object.keys(chapter.texts).length === 0) notFound();

  const label = (t: Partial<Record<(typeof LANGS)[number], string>>) =>
    t.en ?? t.la ?? t.zh ?? "";

  return (
    <>
      <nav className="crumbs">
        <Link href="/">← All chapters</Link>
      </nav>

      <ChapterReader texts={chapter.texts} />

      <nav className="pager">
        {chapter.prev ? (
          <Link href={`/chapters/${chapter.prev.slug}/`}>← {label(chapter.prev.titles)}</Link>
        ) : (
          <span />
        )}
        {chapter.next ? (
          <Link href={`/chapters/${chapter.next.slug}/`}>{label(chapter.next.titles)} →</Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
