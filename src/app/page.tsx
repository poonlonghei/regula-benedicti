import Link from "next/link";
import { getChapterSummaries, LANGS, LANG_ATTR } from "@/lib/chapters";

export default function Home() {
  const chapters = getChapterSummaries();

  return (
    <>
      <section className="hero">
        <h1 lang="la">Regula Sancti Benedicti</h1>
        <p lang="en">The Rule of St. Benedict</p>
        <p lang="zh">聖本篤會規</p>
        <p lang="la" className="motto">
          Ausculta, o fili, praecepta magistri.
        </p>
      </section>

      <section>
        <h2 className="visually-hidden">Chapters</h2>
        {chapters.length === 0 ? (
          <p className="missing">No chapters yet. Add Markdown files under content/.</p>
        ) : (
          <ol className="chapter-list">
            {chapters.map(({ slug, titles }) => (
              <li key={slug}>
                <Link href={`/chapters/${slug}/`}>
                  {LANGS.map(
                    (lang) =>
                      titles[lang] && (
                        <span key={lang} lang={LANG_ATTR[lang]} className={`t-${lang}`}>
                          {titles[lang]}
                        </span>
                      )
                  )}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
