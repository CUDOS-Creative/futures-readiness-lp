<?php

function remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
} 

add_action( 'wp_enqueue_scripts', 'remove_wp_block_library_css', 100 );

function add_excerpt_to_pages() {
	add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'add_excerpt_to_pages' );

function change_admin_favicon() {
  echo '<link rel="icon" type="image/png" href="' . get_template_directory_uri() . '/includes/admin-favicon.png">';
}
add_action('admin_head', 'change_admin_favicon');

if ( !is_admin() ) {
  add_filter('show_admin_bar', '__return_false');
}