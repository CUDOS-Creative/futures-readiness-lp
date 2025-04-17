<?php

/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 * @link https://github.com/timber/starter-theme
 */

use Timber\Timber;

// Load Composer dependencies.
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/theme.php';
require_once __DIR__ . '/includes/post_types.php';
require_once __DIR__ . '/includes/helpers.php';

Timber::init();

new StarterSite();