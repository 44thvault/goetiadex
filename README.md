# Goetiadex

Goetiadex is a single-page React + TypeScript + Tailwind web app that presents the 72 spirits of the Ars Goetia as a retro handheld archival index. It is framed as a historical occult taxonomy interface rather than a game or ritual aid.

## Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Local static data and assets only

## Run

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Deploy With GitHub And Vercel

1. Push this project to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and choose `Add New Project`.
3. Import the GitHub repository.
4. Vercel should detect the project automatically as `Vite`.
5. Confirm these build settings if prompted:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

6. Click `Deploy`.

After that, Vercel will give you a public URL you can share, and future pushes to GitHub can redeploy automatically.

Files added for deployment:

- [`vercel.json`](/C:/Users/squar/Desktop/Codex/vercel.json)
- [`.vercelignore`](/C:/Users/squar/Desktop/Codex/.vercelignore)

## Project Notes

- All demon data is stored locally in [`src/data/goetiaEntries.ts`](/C:/Users/squar/Desktop/Codex/src/data/goetiaEntries.ts).
- Traditional sigils are stored locally under [`public/assets/sigils`](/C:/Users/squar/Desktop/Codex/public/assets/sigils).
- Pixel portraits are stored locally under [`public/assets/portraits`](/C:/Users/squar/Desktop/Codex/public/assets/portraits).
- Favorites, viewed progress, and breach-mode state persist in `localStorage`.

## Data Sourcing And Accuracy

The archive data was generated conservatively from Joseph H. Peterson’s public transcription of the *Lemegeton, Part 1: Goetia*:

- Source used: [Esoteric Archives: Lemegeton, Part 1: Goetia](https://www.esotericarchives.com/solomon/goetia.htm)
- Editor: Joseph H. Peterson

Accuracy handling approach:

- The dataset prioritizes commonly attested Ars Goetia fields such as number, name, rank, legions, offices, and manifestation notes.
- Where names vary across manuscripts or editions, the app uses a standard form and records variants in `aliases` or `notesOnVariations`.
- Sparse entries were kept sparse rather than expanded into modern fanon.
- Sigils are local copies of the traditional facsimiles linked from the source edition.
- Portraits are original pixel-art interpretations based on the textual descriptions, not historical images.

## Asset Generation

The reproducible asset/data build script is:

- [`scripts/build_goetia_assets.ps1`](/C:/Users/squar/Desktop/Codex/scripts/build_goetia_assets.ps1)

It downloads the public source HTML when needed, writes local sigil assets, generates local portrait SVGs, and rebuilds the TypeScript dataset file.

## Note

This is a browser-based web app intended to be hosted and shared by URL. End users do not need to install the project locally.
