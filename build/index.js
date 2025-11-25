(function (blocks, editor, components, element) {
  const { registerBlockType } = blocks;
  const {
    MediaUpload,
    InspectorControls
  } = editor;
  const {
    Button,
    PanelBody,
    SelectControl,
    ColorPicker,
    TextControl,
    TextareaControl
  } = components;
  const { createElement: el, Fragment } = element;

  function normalizeSize(size) {
    if (!size) return 'auto';
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string') {
      if (size.match(/^\d+$/)) return `${size}px`;
      if (size.match(/^\d+(px|%)$/)) return size;
      return 'auto';
    }
    return 'auto';
  }

  registerBlockType('custom/oasis-flipbox', {
    title: 'Oasis Flipbox',
    icon: {
      background: '#00d764',
      foreground: '#ffffff',
      src: 'cover-image'
    },
    category: 'design',
    attributes: {
      frontTitle: { type: 'string', default: '' },
      backTitle: { type: 'string', default: '' },
      backText: { type: 'string', default: '' },
      frontImage: { type: 'string', default: '' },
      frontBgColor: { type: 'string', default: '#333333' },
      frontImageSize: { type: 'string', default: 'auto' },
      frontImageAlign: { type: 'string', default: 'middle' },
      linkUrl: { type: 'string', default: '' },
      buttonText: { type: 'string', default: '' },
      verticalAlign: { type: 'string', default: 'middle' },
      backBgColor: { type: 'string', default: '#D3A693' },
      frontImageMode: { type: 'string', default: 'cover' }
    },

    edit: function (props) {
      const {
        attributes: {
          frontTitle,
          backTitle,
          backText,
          frontImage,
          frontBgColor,
          frontImageSize,
          frontImageAlign,
          linkUrl,
          buttonText,
          verticalAlign,
          backBgColor,
          frontImageMode
        },
        setAttributes
      } = props;

      const hasHoverSync = linkUrl && buttonText;

      const card = el('div', {
        className: 'flip-card wp-block-custom-oasis-flipbox' + (hasHoverSync ? ' has-hover-sync' : ''),
        style: { width: '100%' }
      },
        el('div', { className: 'flip-card-inner' },

          el('div', {
            className:
              'flip-card-front align-' + verticalAlign +
              (frontImageMode === 'picto' ? ' image-mode-picto' : ''),
            style: frontImage
              ? {
                backgroundImage: `url(${frontImage})`,
                backgroundColor: frontBgColor,
                backgroundSize: normalizeSize(frontImageSize),
                backgroundPosition: `center ${frontImageAlign || 'middle'}`
              }
              : { backgroundColor: frontBgColor },
          },
            el('h3', {
              className: 'flip-title',
              dangerouslySetInnerHTML: { __html: frontTitle }
            })
          ),

          el('div', {
            className: 'flip-card-back',
            style: { backgroundColor: backBgColor }
          },
            el('h3', {
              className: 'flip-title',
              dangerouslySetInnerHTML: { __html: backTitle }
            }),
            el('p', {
              dangerouslySetInnerHTML: { __html: backText }
            }),
            buttonText && el('div', {
              className: 'wp-block-buttons is-vertical is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-1 wp-block-buttons-is-layout-flex'
            },
              el('div', { className: 'wp-block-button has-custom-width wp-block-button__width-100' },
                el('div', {
                  className: 'fake-button wp-block-button__link wp-element-button',
                }, buttonText)
              )
            )
          )
        )
      );

      return el(Fragment, {},
        el(InspectorControls, {},
          el(PanelBody, { title: 'Contenu', initialOpen: true },

            el(TextControl, {
              label: 'Titre (recto)',
              value: frontTitle,
              onChange: (text) => setAttributes({ frontTitle: text })
            }),

            el(TextControl, {
              label: 'Titre (verso)',
              value: backTitle,
              onChange: (text) => setAttributes({ backTitle: text })
            }),

            el(TextareaControl, {
              label: 'Texte verso',
              value: backText,
              onChange: (text) => setAttributes({ backText: text })
            }),

            el(TextControl, {
              label: 'Texte du bouton',
              value: buttonText,
              onChange: (text) => setAttributes({ buttonText: text })
            }),

            el(SelectControl, {
              label: 'Alignement vertical (face avant)',
              value: verticalAlign,
              options: [
                { label: 'Haut', value: 'top' },
                { label: 'Milieu', value: 'middle' },
                { label: 'Bas', value: 'bottom' }
              ],
              onChange: (val) => setAttributes({ verticalAlign: val })
            }),

            el(PanelBody, { title: "Image recto", initialOpen: true },
              el(MediaUpload, {
                onSelect: (media) => setAttributes({ frontImage: media.url }),
                type: 'image',
                render: ({ open }) => el(Button, { onClick: open, isSecondary: true },
                  frontImage ? "Changer l'image" : "Ajouter une image"
                )
              }),
              frontImage && el(Button, {
                isDestructive: true,
                style: { marginTop: '10px' },
                onClick: () => setAttributes({ frontImage: '' })
              }, "Supprimer l'image"),
              el(SelectControl, {
                label: "Mode d'affichage de l'image",
                value: frontImageMode,
                options: [
                  { label: "Image de fond (plein cadre)", value: "cover" },
                  { label: "Pictogramme (fond transparent)", value: "picto" }
                ],
                onChange: (val) => setAttributes({ frontImageMode: val })
              }),
              el(TextControl, {
                label: "Taille de l'image (ex: 100px, 50%, auto)",
                value: frontImageSize,
                onChange: (val) => setAttributes({ frontImageSize: val })
              }),
              el(SelectControl, {
                label: "Alignement vertical de l'image",
                value: frontImageAlign,
                options: [
                  { label: "Haut", value: "top" },
                  { label: "Milieu", value: "middle" },
                  { label: "Bas", value: "bottom" }
                ],
                onChange: (val) => setAttributes({ frontImageAlign: val })
              })
            ),

            !frontImage && el('div', {},
              el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 'bold' } }, 'Couleur de fond (recto sans image)'),
              el(ColorPicker, {
                color: frontBgColor,
                onChangeComplete: (value) => setAttributes({ frontBgColor: value.hex }),
                disableAlpha: true
              })
            ),

            el(TextControl, {
              label: 'Lien de la carte',
              value: linkUrl,
              onChange: (url) => setAttributes({ linkUrl: url })
            }),

            el('div', {},
              el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 'bold' } }, 'Couleur de fond (verso)'),
              el(ColorPicker, {
                color: backBgColor,
                onChangeComplete: (value) => setAttributes({ backBgColor: value.hex }),
                disableAlpha: true
              })
            )
          )
        ),

        card
      );
    },

    save: function (props) {
      const {
        frontTitle,
        backTitle,
        backText,
        frontImage,
        frontBgColor,
        frontImageSize,
        frontImageAlign = 'middle',
        linkUrl,
        buttonText,
        verticalAlign,
        backBgColor,
        frontImageMode
      } = props.attributes;

      const hasHoverSync = linkUrl && buttonText;

      // Normalize frontImageSize and frontImageAlign to avoid validation mismatch
      const normalizedFrontImageSize = frontImageSize || 'auto';
      const normalizedFrontImageAlign = frontImageAlign || 'middle';

      const card = el('div', {
        className: 'flip-card wp-block-custom-oasis-flipbox' + (hasHoverSync ? ' has-hover-sync' : ''),
        style: { width: '100%' }
      },
        el('div', { className: 'flip-card-inner' },

          el('div', {
            className:
              'flip-card-front align-' + verticalAlign +
              (frontImageMode === 'picto' ? ' image-mode-picto' : ''),
            style: frontImage
              ? {
                backgroundImage: `url(${frontImage})`,
                backgroundColor: frontBgColor,
                backgroundSize: normalizedFrontImageSize,
                backgroundPosition: `center ${normalizedFrontImageAlign}`
              }
              : { backgroundColor: frontBgColor },
          },
            el('h3', {
              className: 'flip-title',
              dangerouslySetInnerHTML: { __html: frontTitle }
            })
          ),

          el('div', {
            className: 'flip-card-back',
            style: { backgroundColor: backBgColor }
          },
            el('h3', {
              className: 'flip-title',
              dangerouslySetInnerHTML: { __html: backTitle }
            }),
            el('p', {
              dangerouslySetInnerHTML: { __html: backText }
            }),
            buttonText && el('div', {
              className: 'wp-block-buttons is-vertical is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-1 wp-block-buttons-is-layout-flex'
            },
              el('div', { className: 'wp-block-button has-custom-width wp-block-button__width-100' },
                el('div', {
                  className: 'fake-button wp-block-button__link wp-element-button',
                }, buttonText)
              )
            )
          )
        )
      );

      return linkUrl
        ? el('a', {
          href: linkUrl,
          className: 'flip-card-link-wrapper',
          style: { textDecoration: 'none', color: 'inherit', display: 'block' }
        }, card)
        : card;
    }
  });
})(window.wp.blocks, window.wp.blockEditor, window.wp.components, window.wp.element);
