<?php

/**
 * The Template for displaying all single posts
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

namespace App;

use Timber\Timber;

$context = Timber::context();
$post = Timber::get_post();
$context['post'] = $post;

$templates = array('templates/single-' . $post->post_type . '.twig', 'templates/single.twig');

if (post_password_required($post->ID)) {
	$templates = 'templates/single-password.twig';
}

[$toc, $content_with_anchors] = generate_toc_from_content($post->post_content);
$post->content_with_anchors = apply_filters('the_content', $content_with_anchors);
$context['toc'] = $toc;

$context['hero'] = get_field('hero');
$context['show_toc'] = get_field('display_table_of_contents');

Timber::render($templates, $context);