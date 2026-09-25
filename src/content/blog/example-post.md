---
title: "Example post: how writing for this blog works"
date: 2026-09-25
description: A draft that shows every formatting feature. It only appears while running the dev server — delete it or copy it as a starting point.
category: Tips
tags: [markdown, example]
lang: en
draft: true
---

Every `.md` file in `src/content/blog/` becomes a page at `/blog/<file-name>`. Fill in the frontmatter above, write Markdown below, and the post shows up on the blog list, newest first.

## Frontmatter

| Field         | Required | Notes                                                              |
| ------------- | -------- | ------------------------------------------------------------------ |
| `title`       | yes      | Quote it if it contains a colon.                                   |
| `date`        | yes      | `YYYY-MM-DD`. Future dates are not hidden — use `draft` for that.  |
| `description` | yes      | One or two sentences; shown on cards.                              |
| `category`    | yes      | `Tutorial`, `Tips` or `Story`.                                     |
| `tags`        | no       | `[go, kubernetes]`; the first three show on cards.                 |
| `lang`        | no       | `en` (default) or `id` for Indonesian posts.                       |
| `draft`       | no       | `true` hides the post from the deployed site (still visible in dev). |

## Text and lists

Regular paragraphs support **bold**, *italic*, `inline code` and [links](https://medium.com/@arieansyah).

- Bullet lists
- With [GitHub-flavoured Markdown](https://github.github.com/gfm/) extras
  - Nested items work too

1. Numbered steps
2. Also work

> Blockquotes are good for callouts and pull quotes.

## Code blocks

Put the language after the opening fence to get syntax highlighting.

```go
func Retry(ctx context.Context, attempts int, fn func() error) error {
	var err error
	for i := 0; i < attempts; i++ {
		if err = fn(); err == nil {
			return nil
		}
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(time.Duration(1<<i) * 100 * time.Millisecond):
		}
	}
	return fmt.Errorf("after %d attempts: %w", attempts, err)
}
```

```yaml
name: deploy
on:
  push:
    branches: [master]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: helm upgrade --install app ./chart --set image.tag=${{ github.sha }}
```

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}
```

```php
final class ReportService
{
    public function __construct(private readonly Clock $clock) {}

    public function today(): string
    {
        return $this->clock->now()->format('Y-m-d'); // never cache the request here
    }
}
```

```bash
kubectl rollout status deploy/api --timeout=120s && echo "ready"
```

## Images

Put files in `public/blog/<post-name>/` and reference them with an absolute path: `![Alt text](/blog/example-post/diagram.png)`.
