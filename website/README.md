# Vocello Website

This directory contains the public Vocello JP localization site. The canonical root is the Japanese page and is published at `https://studio-rizi.pages.dev/projects/vocello-jp/` through the `oriyu90/studio-rizi` repository.

The React site under `src/` is an upstream reference preview. It must never be copied to the Studio RIZI production path. `npm run build` intentionally emits only the localized static site from `public/`.

## Commands

Run these from the QwenVoice repo root:

```sh
npm --prefix website ci
npm --prefix website run dev
npm --prefix website run dev:react-preview
npm --prefix website run lint
npm --prefix website test
npm --prefix website run build
npm --prefix website run build:react-preview
npm --prefix website run check
npm --prefix website run preview
```

When working from this directory, the same commands can be run without `--prefix website`.

## Deployment

1. Run `npm --prefix website run check`. The final `website/dist/` must contain the localized Japanese root, not the React reference page.
2. Sync the resulting `website/dist/` into `oriyu90/studio-rizi` at `website/projects/vocello-jp/`.
3. Run `npm test` in `studio-rizi` and push its `main` branch.

Cloudflare Pages publishes the central repository's `website/` directory. The former standalone Pages project only provides a permanent redirect to the canonical URL.

The localized production site does not mount Vercel Analytics or the React application.

The two small hashed files under `public/assets/` are migration tombstones. They replace
the former upstream JavaScript and CSS at URLs that may remain in edge caches; do not
remove them while the old URLs are still externally reachable.

The former `PowerBeef/vocello-website` repository is historical after this migration.

Pull requests run the deterministic website contract and localized production build in the repository CI.
The checks use the exact Node/npm identities recorded in `config/toolchain.json`; browser inspection
is an additional visual review, not the only correctness signal.
