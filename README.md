# Animated Flip Box Gutenberg Block

## Overview

The Animated Flip Box Gutenberg Block is a customizable WordPress block that allows users to create animated flip boxes with front (recto) and back (verso) sides. Users can add titles, text, images, and customize colors and layout options.

## Features

- Front and back content with titles and text.
- Front image with customizable size and vertical alignment (top, middle, bottom).
- Background color options for front and back sides.
- Button with customizable text and colors.
- Image display modes: cover (full background) or picto (transparent background).
- Link URL for the entire flip box.
- Vertical alignment options for front content.

## Installation

1. Upload the plugin folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Use the "Animated Flip Box" block in the Gutenberg editor.

## Usage

- Add the "Animated Flip Box" block to your post or page.
- Customize the front and back titles and text.
- Upload a front image and choose its display mode.
- Adjust the front image size (e.g., 100px, 50%, auto).
- Set the vertical alignment of the front image (top, middle, bottom).
- Choose background colors for front and back sides.
- Add button text and customize button colors.
- Set the vertical alignment of the front content.

## Development

- The block is registered in `build/index.js`.
- Attributes and settings are defined in `block.json`.
- Styles are applied inline with support for dynamic customization.
- Image size normalization ensures valid CSS values.
- Vertical alignment uses CSS background-position and conditional classes.

## Changelog

### Version 1.0.0

- Initial release with customizable front and back content.
- Added front image size and vertical alignment options.
- Fixed block validation issues related to style attributes.

## Support

For issues or feature requests, please open an issue on the plugin's GitHub repository.

## License

This plugin is licensed under the GPLv2 or later.
