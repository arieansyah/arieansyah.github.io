# Blog content

## Write a post

1. Add `src/content/blog/<url-slug>.md` (the file name becomes `/blog/<url-slug>`).
2. Fill in the frontmatter and write Markdown. `blog/example-post.md` documents every field and formatting feature.
3. `npm run dev` to preview, then commit and push — the site deploys from `master`.

Set `draft: true` to keep a post out of the deployed site while you work on it. It only hides the post — the file is still in the repo, so don't commit anything you need to keep private.

Add each published post to `public/sitemap.xml` (`https://arieansyah.github.io/blog/<url-slug>`).

## Posts published on Medium

`medium-posts.json` lists your Medium stories; they appear on the blog and link out to Medium.

```bash
npm run sync:medium
```

Pulls new stories from your Medium RSS feed (Medium only exposes the latest 10) and keeps existing entries. Edit `category` (`Tutorial`, `Tips`, `Story`) or `lang` (`en`, `id`) in the JSON by hand; re-syncing won't overwrite them.
