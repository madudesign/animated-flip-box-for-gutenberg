# Animated Flip Box Gutenberg Plugin

## Version 3.8.1

### Features Added

- Front background color picker is now always visible in the block inspector, even when a front image is set.
- Added new block attributes `cardHeight` and `cardWidth` to control the height and max width of the flip card.
- The flip card's height (`.flip-card-inner`) and max width (`.flip-card`) are now adjustable via new TextControls in the block inspector.
- The width style uses `width: 100%` with `max-width` controlled by `cardWidth` for responsive behavior.
- Default height and width remain 400px for backward compatibility.
- The block slug remains `custom/oasis-flipbox` and existing block behavior is preserved.

### Usage

- Use the "Couleur de fond du recto" color picker to set the front background color regardless of front image presence.
- Use the "Hauteur de la carte (ex: 400px, 50vh)" text input in the inspector to set the card height with any valid CSS height value (e.g., px, %, vh).
- Use the "Largeur max de la carte (ex: 400px, 100%, 50%)" text input in the inspector to set the card max width responsively.

### Testing

- Verify the front background color picker is always visible.
- Adjust the card height and max width and confirm the flip card dimensions change in the editor and on the front-end.
- Confirm existing blocks without the new attributes retain the default height and width of 400px.

### Notes

- The CSS rule for `.flip-card` was updated to have `max-width: 100%` to allow inline styles to control width.
- The plugin remains compatible with existing content and block instances.
