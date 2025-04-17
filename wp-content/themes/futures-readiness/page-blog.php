<?php

/**
 * Template Name: Blog
 *
 */

namespace App;

use Timber\Timber;

$context = Timber::context();

$context['hero'] = get_field('hero');
$context['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;

$category_slug = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : null;

$args = [
  'post_type'      => 'post',
  'posts_per_page' => 9,
  'paged'          => $context['paged'],
];

if ($category_slug) {
  $args['tax_query'] = [[
      'taxonomy' => 'category',
      'field'    => 'slug',
      'terms'    => $category_slug,
  ]];
}

$context['categories'] = Timber::get_terms([
  'taxonomy' => 'category',
  'hide_empty' => true, // set to true if you want only categories with posts
]);

$context['posts'] = Timber::get_posts($args);
$context['active_category'] = $category_slug;

Timber::render('templates/page-blog.twig', $context);