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

- Keep `/lets-grow-together` as the existing inquiry-form page and `/contact` as a separate direct-channels page; this preserves one shared form while making Contact the final navigation destination.
- The inquiry form renders only on `/lets-grow-together`; other pages use ContactSection CTA mode linking there, to avoid duplicate forms.
