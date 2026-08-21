import React from "react";

const languages = [
  ["日本語", "/projects/vocello-jp/ja/"],
  ["English", "/projects/vocello-jp/en/"],
  ["中文", "/projects/vocello-jp/zh/"],
  ["Português", "/projects/vocello-jp/pt/"],
];

export const LanguageBar = () => (
  <div className="language-bar" aria-label="Language selector">
    <span>Vocello JP</span>
    <nav>
      {languages.map(([label, href]) => (
        <a key={href} href={href} hrefLang={href.slice(1, -1)}>{label}</a>
      ))}
    </nav>
  </div>
);
