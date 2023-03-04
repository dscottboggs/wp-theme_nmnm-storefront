<?php
add_action('wp_enqueue_scripts', 'nmnm_storefront_import_scripts');
add_action('init', 'nmnm_storefront_action_init');

/**
 * Fires after WordPress has finished loading but before any headers are sent.
 *
 */
function nmnm_storefront_action_init(): void
{
    add_post_type_support('page', array('excerpt'));
}

/**
 * Fires when scripts and styles are enqueued.
 *
 */
function nmnm_storefront_import_scripts()
{
    wp_enqueue_script(
        'nmnm_storefront_fancy_scroll',
        get_stylesheet_directory_uri() . '/assets/fancy-scroll.js',
        array(),
        '1.1.2',
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