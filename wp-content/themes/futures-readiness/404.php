<?php

/**
 * The template for the 404 page
 */

namespace App;

use Timber\Timber;

$context = Timber::context();
$context['error_content'] = get_field('404_content', 'options');
Timber::render('templates/404.twig', $context);