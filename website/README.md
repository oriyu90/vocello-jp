# Vocello Website

This directory contains the source for the public Vocello marketing site. It is a React + Vite app maintained in this repository and published at `https://studio-rizi.pages.dev/projects/vocello-jp/` through the `oriyu90/studio-rizi` repository.

## Commands

Run these from the QwenVoice repo root:

```sh
npm --prefix website ci
npm --prefix website run dev
npm --prefix website run lint
npm --prefix website test
npm --prefix website run build
npm --prefix website run check
npm --prefix website run preview
```

When working from this directory, the same commands can be run without `--prefix website`.

## Deployment

1. Run `npm --prefix website run check`.
2. Sync the resulting `website/dist/` into `oriyu90/studio-rizi` at `website/projects/vocello-jp/`.
3. Run `npm test` in `studio-rizi` and push its `main` branch.

Cloudflare Pages publishes the central repository's `website/` directory. The former standalone Pages project only provides a permanent redirect to the canonical URL.

Vercel Web Analytics remains mounted in the page (cookieless, aggregate page views; enabled
2026-07-28). The page mounts the `@vercel/analytics` React component, and the privacy policy at
`public/privacy/index.html` discloses the website-scoped analytics while the apps stay
zero-telemetry. Keep those three in sync if the analytics posture ever changes.

The former `PowerBeef/vocello-website` repository is historical after this migration.

Pull requests run the deterministic website contract and production build in the repository CI.
The checks use the exact Node/npm identities recorded in `config/toolchain.json`; browser inspection
is an additional visual review, not the only correctness signal.
