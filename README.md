# Pearl Removals — website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion 12.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Brand
- Palette: midnight navy `#0F2340` · pearl white `#F5F1EA / #FAF8F4` · seafoam `#A8D5C5 / #D4EBE2` · champagne gold `#C4A574`.
- Type: Libre Caslon Text (headings) · Cinzel (logo wordmark) · Jost (body).
- Logo: pearl-and-wave mark in `components/ui/Logo.tsx` (`PearlMark` + wordmark). Favicon: `app/icon.svg`.
- Tagline: *Move well. Arrive happy.*

## Content
All copy lives in `content/site.ts`. **`contact` holds placeholders** — replace with the real phone, email,
address and hours before launch. Images in `public/images/` are cropped from the client's brand mockups.

## Quote form
`components/ui/QuoteForm.tsx` posts to Web3Forms when `NEXT_PUBLIC_WEB3FORMS_KEY` is set (Pearl Removals'
own key). Without it the form is a clearly-labelled preview and sends nothing.

## Preview on GitHub Pages
Every push to `main` runs `.github/workflows/deploy-pages.yml` and publishes a static export to
`https://<user>.github.io/Pearl-Removals/`. Add `NEXT_PUBLIC_WEB3FORMS_KEY` as a repository secret and
pass it in the workflow's build `env` to connect the form there.
