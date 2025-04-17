<?php

use Timber\Site;
use Timber\Timber;

/**
 * Class StarterSite
 */
class StarterSite extends Site
{
	public function __construct()
	{
		add_action('after_setup_theme', array($this, 'theme_supports'));
    add_action('init', array($this, 'register_menus'));
    add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'), 100);
		add_filter('timber/context', array($this, 'add_to_context'));
		add_filter('timber/twig', array($this, 'add_to_twig'));
    add_filter('timber/twig/environment/options', [$this, 'update_twig_environment_options']);
    
		parent::__construct();
	}


  public function register_menus() {
    register_nav_menus(
      array(
        'primary'     => __('Primary Menu'),
        'footer_nav'  => __('Footer Navigation'),
      )
    );
  }

  public function enqueue_assets()
  {
    $css_file = get_template_directory_uri() . '/assets/css/style.min.css';
    $css_version = filemtime(get_template_directory() . '/assets/css/style.min.css');

    $js_file = get_template_directory_uri() . '/assets/js/scripts.min.js';
    $js_version = filemtime(get_template_directory() . '/assets/js/scripts.min.js');
    
    // Enqueue the CSS file with cache busting
    wp_enqueue_style('theme-style', $css_file, array(), $css_version);

    // Enqueue the JS file with cache busting
    wp_enqueue_script('theme-script', $js_file, array(), $js_version, true); // 'true' to load in footer
    wp_enqueue_script('ajax-scripts', get_template_directory_uri() . '/assets/js/ajax.min.js', ['jquery', 'wp-data', 'wc-blocks-checkout'], null, true);

    wp_localize_script('theme-script', 'themeData', array(
      'themeDir' => get_template_directory_uri()
    ));
    wp_localize_script('ajax-scripts', 'ajax_scripts', ['ajax_url' => admin_url('admin-ajax.php')]);

  }

	/**
	 * This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context($context)
	{
		$context['menu']  = Timber::get_menu('primary');
    $context['footer_menu'] = Timber::get_menu('footer_nav');

    $context['linkedin'] = get_field('linkedin', 'options');
    $context['hero_video'] = get_field('hero_video', 'options');
    
		$context['site']  = $this;
   
		return $context;
	}

	public function theme_supports()
	{
		add_theme_support('automatic-feed-links');
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support('menus');
	}

  public function theme_get_svg($url) {
    // Ensure the URL is valid
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return '<!-- Invalid SVG URL -->';
    }

      // Fetch the SVG content from the URL
      $response = wp_remote_get($url, ['timeout' => 10]);

      // Check for errors in the response
      if (is_wp_error($response)) {
          return '<!-- Error fetching SVG: ' . esc_html($response->get_error_message()) . ' -->';
      }

      // Retrieve the body content
      $svg_content = wp_remote_retrieve_body($response);

      // Check if the content is empty or not valid SVG
      if (empty($svg_content) || strpos($svg_content, '<svg') === false) {
          return '<!-- SVG file not found or invalid SVG -->';
      }

      // Sanitize and return the SVG content
      return $svg_content;
  }

  public function theme_get_posts($post_type, $post_count = null, $category_id = null) 
  {
    $args = [
        'post_type'      => (array) $post_type, // Convert single value to array if needed
        'posts_per_page' => $post_count ?: -1,
    ];

    if ($category_id) {
        if (is_array($category_id)) {
            $args['category__in'] = $category_id; // Supports multiple category IDs
        } else {
            $args['cat'] = $category_id; // Supports a single category ID
        }
    }

    return Timber::get_posts($args);
  }


  public function show_breadcrumbs() {
    if (function_exists('yoast_breadcrumb')) {
      yoast_breadcrumb('<nav class="breadcrumb">', '</nav>');
    }
  }

  public function get_read_time($post) {
    $words = str_word_count(strip_tags($post->post_content));
    $minutes = ceil($words / 200); // using 200 wpm as average
    return $minutes;
  }

  public function add_to_twig($twig)
	{
    $twig->addFunction(new \Twig\TwigFunction('theme_get_posts', [$this, 'theme_get_posts']));
    $twig->addFunction(new \Twig\TwigFunction('theme_get_svg', [$this, 'theme_get_svg']));
    $twig->addFunction(new \Twig\TwigFunction('get_read_time', [$this, 'get_read_time']));
    $twig->addFunction(new \Twig\TwigFunction('show_breadcrumbs', [$this, 'show_breadcrumbs']));
		return $twig;
	}

	function update_twig_environment_options($options)
	{
		// $options['autoescape'] = true;
		return $options;
	}
  
}