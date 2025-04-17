<?php

/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 */

namespace App;

use Timber\Timber;

$context = Timber::context();

$context['hero'] = get_field('hero');

Timber::render('templates/page.twig', $context);