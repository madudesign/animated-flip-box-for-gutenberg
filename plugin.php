<?php
/**
 * Plugin Name: Oasis Flipbox
 * Description: Bloc Gutenberg de type flipbox avec texte, image et bouton éditables.
 * Version: 3.7.2
 * Author: Madu
 */

function afbg_register_block() {
    // CSS du bloc
    wp_enqueue_style(
        'afbg-style',
        plugin_dir_url(__FILE__) . 'build/index.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    // Script principal du bloc
    wp_register_script(
        'afbg-block',
        plugin_dir_url(__FILE__) . 'build/index.js',
        array('wp-blocks', 'wp-editor', 'wp-element', 'wp-components', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
        true
    );

    // Enregistrement du bloc principal (sans block.json)
    register_block_type('custom/oasis-flipbox', array(
        'editor_script' => 'afbg-block',
        'style' => 'afbg-style',
        'supports' => array(
            'html' => false,
            'widgets' => true
        )
    ));
}
add_action('init', 'afbg_register_block');


// ➕ Ajout du JS tactile pour le flip sur mobile
add_action('wp_footer', 'afbg_touch_script');
function afbg_touch_script() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const cards = document.querySelectorAll('.flip-card');

        cards.forEach(card => {
            let isTouched = false;

            card.addEventListener('touchstart', function () {
                card.classList.toggle('afbg-flipped');
                isTouched = true;
            });

            card.addEventListener('mouseleave', function () {
                if (isTouched) {
                    card.classList.remove('afbg-flipped');
                    isTouched = false;
                }
            });
        });
    });
    </script>
    <?php
}
