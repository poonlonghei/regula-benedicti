"use client";

import { useState } from "react";
import { LANGS, LANG_ATTR, LANG_LABEL, type ChapterText, type Lang } from "@/lib/chapters";

interface Props {
  texts: Partial<Record<Lang, ChapterText>>;
}

/** Shows the chapter in one, two or three languages side by side. */
export default function ChapterReader({ texts }: Props) {
  const [visible, setVisible] = useState<Lang[]>([...LANGS]);

  const toggle = (lang: Lang) =>
    setVisible((cur) =>
      cur.includes(lang)
        ? cur.length > 1
          ? cur.filter((l) => l !== lang)
          : cur // always keep at least one language
        : LANGS.filter((l) => l === lang || cur.includes(l))
    );

  return (
    <div>
      <div className="lang-toggle" role="group" aria-label="Languages">
        {LANGS.map((lang) => (
          <button
            key={lang}
            type="button"
            aria-pressed={visible.includes(lang)}
            onClick={() => toggle(lang)}
          >
            {LANG_LABEL[lang]}
          </button>
        ))}
      </div>

      <div className="columns" style={{ ["--cols" as string]: visible.length }}>
        {visible.map((lang) => {
          const text = texts[lang];
          return (
            <article key={lang} lang={LANG_ATTR[lang]} className={`col col-${lang}`}>
              {text ? (
                <>
                  <h2>{text.title}</h2>
                  <div className="prose" dangerouslySetInnerHTML={{ __html: text.html }} />
                </>
              ) : (
                <p className="missing">Not yet added.</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
