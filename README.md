# Animated Flip Box Gutenberg Plugin

## Version 3.8

### Features Added

- Front background color picker is now always visible in the block inspector, even when a front image is set.
- Added a new block attribute `cardHeight` to control the height of the flip card.
- The height of the flip card (`.flip-card-inner`) is now adjustable via a new TextControl in the block inspector.
- The height setting affects both the editor and front-end rendering.
- Default height remains 400px for backward compatibility.
- The block slug remains `custom/oasis-flipbox` and existing block behavior is preserved.

### Usage

- Use the "Couleur de fond du recto" color picker to set the front background color regardless of front image presence.
- Use the "Hauteur de la carte (ex: 400px, 50vh)" text input in the inspector to set the card height with any valid CSS height value (e.g., px, %, vh).

### Testing

- Verify the front background color picker is always visible.
- Adjust the card height and confirm the flip card height changes in the editor and on the front-end.
- Confirm existing blocks without the new attribute retain the default height of 400px.

### Notes

- No changes to CSS files were made; inline styles override the fixed height.
- The plugin remains compatible with existing content and block instances.
