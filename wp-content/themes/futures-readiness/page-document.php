<?php

/**
 * Template Name: Policy Page
 */

namespace App;

use Timber\Timber;

$context = Timber::context();
$post = $context['post'];
$templates = array('templates/single-' . $post->post_type . '.twig', 'templates/single.twig');

if (post_password_required($post->ID)) {
	$templates = 'templates/single-password.twig';
}

if ($post->post_type === 'post') {
  [$toc, $content_with_anchors] = generate_toc_from_content($post->post_content);
  $post->content_with_anchors = apply_filters('the_content', $content_with_anchors);
  $context['toc'] = $toc;
}

$context['hero'] = get_field('hero');
$context['show_toc'] = get_field('display_table_of_contents');

Timber::render($templates, $context);