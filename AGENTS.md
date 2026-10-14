<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application conventions
- Use top-level TanStack content routes with shared navigation and footer in the root layout; each page owns its social metadata to preserve shareable public URLs.
- Keep editable business details, event categories, and image references in a client-safe content module so factual updates stay consistent across pages.
- Label generated photographs as illustrative inspiration rather than venue evidence, keeping original brand assets intact.
- Receive public enquiries through a schema-validated server function using an insert-only public database client; never expose enquiry reads to visitors.
- Use a database trigger for durable per-email submission throttling because Workers cannot persist in-memory rate limits.
- Put reusable visual roles and layout rules in the global design system and use Button variants for interactive controls.
