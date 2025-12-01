# Repository Guidelines

## Project Structure & Module Organization
The plugin ships as a slim WordPress package, so every file in this directory is deployed as-is. `plugin.php` registers the `custom/oasis-flipbox` block, enqueues the assets, and injects the mobile flip helper. Declarative attributes live in `block.json` and must mirror the JS object in `build/index.js`. That JS file plus `build/index.css` contain the block UI and styling that Gutenberg and the front end both reuse.

## Build, Test, and Development Commands
- `wp plugin activate oasis-flipbox --path=/path/to/wp` and `wp plugin deactivate …` switch the block on/off in any local WordPress instance; always deactivate before replacing files in production.
- `php -l plugin.php` is the quickest safeguard before committing PHP edits.
- When you need modern syntax, place sources in a temporary `src/` directory and run `npx @wordpress/scripts build src/index.js --output-path build` so the committed `build/` artifacts stay backwards compatible. Otherwise edit the ES5 bundle directly.

## Coding Style & Naming Conventions
Follow WordPress PHP standards: 4-space indents, snake_case helpers, and explicit hooks added via `add_action`. JavaScript remains in ES5 format with two-space indents and descriptive attribute names (`frontImageMode`, `verticalAlign`). CSS selectors stay scoped under `.flip-card` or `.wp-block-custom-oasis-flipbox`; add modifier classes instead of descendant chains to keep styles portable.

## Testing Guidelines
There is no automated suite, so smoke-test inside Gutenberg and on the rendered page. Verify every attribute combination (image vs. color, picto vs. cover, button/link presence, alignment options) and confirm hover/touch flipping still works. Test at 320px, 768px, and desktop widths because the CSS includes breakpoint-specific rules. Record screenshots or short clips whenever UI changes to streamline review.

## Commit & Pull Request Guidelines
Git history favors short imperative subjects (`Remove middle image option`). Keep each commit focused on one concern and mention cross-file couplings in the body. Pull requests should include: summary, testing notes, any manual upgrade steps, and before/after visuals when styling or behavior changes. Link to the originating issue or ticket so releases remain traceable.

## Security & Configuration Tips
Escape and sanitize all user data before printing it from PHP, even if Gutenberg already filtered it. Consider wrapping front-end helpers in `has_block( 'custom/oasis-flipbox' )` to avoid loading scripts site-wide. Never commit credentials; store WordPress URLs or API keys outside this repository, and keep file permissions at `644/755` to prevent hostile rewrites on shared hosts.
