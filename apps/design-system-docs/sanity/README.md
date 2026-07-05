# Sanity CMS — Marmo UI docs site

The docs site reads three content types from Sanity: **post** (the `/updates`
page), **testimonial** (landing page, only `published == true`), and **faq**
(optional). The site builds and runs fine with Sanity unconfigured — CMS
sections simply render nothing.

## Connect

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
   (dataset: `production`, public read access).
2. Set in `apps/design-system-docs/.env`:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. Restart `pnpm dev`.

## Studio

Run the Studio as its own project (recommended — keeps the studio toolchain
out of the Next.js bundle):

```bash
npm create sanity@latest -- --project <project-id> --dataset production
```

Then copy the schema objects from `sanity/schemas/` into the studio's
`schemaTypes/` index:

```ts
import post from './post';
import testimonial from './testimonial';
import faq from './faq';

export const schemaTypes = [post, testimonial, faq];
```

## Where content renders

| Type          | Where                                   | Notes                          |
| ------------- | --------------------------------------- | ------------------------------ |
| `post`        | `/updates` and `/updates/[slug]`        | ISR, revalidates every 5 min   |
| `testimonial` | Landing page, below the showcase        | Hidden until entries exist     |
| `faq`         | (available via `getSanityClient()`)     | Landing FAQ is static for now  |

Query helpers live in `src/sanity/queries.ts`; the client in
`src/sanity/client.ts`.
