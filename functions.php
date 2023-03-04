<?php
add_action('wp_enqueue_scripts', 'nmnm_storefront_import_scripts');

function nmnm_storefront_import_scripts()
{
    wp_enqueue_script(
        'nmnm_storefront_fancy_scroll',
        get_stylesheet_directory_uri() . '/assets/fancy-scroll.js',
        array(),
        '1.1.1',
        false
    );
    wp_enqueue_script(
        'nmnm_storefront_js_init',
        get_stylesheet_directory_uri() . '/assets/init.js',
        array('nmnm_storefront_fancy_scroll'),
        '1.0.1',
        false
    );
}