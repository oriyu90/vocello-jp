import React from "react";

const languages = [
  ["日本語", "/ja/"],
  ["English", "/en/"],
  ["中文", "/zh/"],
  ["Português", "/pt/"],
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
