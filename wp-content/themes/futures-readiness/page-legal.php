<?php

/**
 * Template Name: Legal Documents
 *
 */

namespace App;

use Timber\Timber;

$context = Timber::context();

$context['hero'] = get_field('hero');

$args = [
  'post_type'      => 'documents',
  'posts_per_page' => -1,
];

$context['posts'] = Timber::get_posts($args);

Timber::render('templates/page-legal.twig', $context);