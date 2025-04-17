<?php

add_action( 'init', 'register_custom_post_types', 0 );

function register_custom_post_types() {
  $post_types = array(
      'faq' => array(
          'singular' => 'FAQ',
          'plural' => 'FAQs',
          'args' => array(
              'public'                => false,
              'has_archive'           => false,
              'supports'              => array( 'title', 'editor', 'revisions' ),
              'hierarchical'          => true,
              'show_ui'               => true,
              'show_in_menu'          => true,
              'menu_position'         => 5,
              'show_in_admin_bar'     => true,
              'show_in_nav_menus'     => true,
              'can_export'            => true,
              'menu_icon'             => 'dashicons-editor-help',
              'exclude_from_search'   => true,
              'publicly_queryable'    => false,
              'capability_type'       => 'page',
          ),
      ),
      'documents' => array(
        'singular' => 'Document',
        'plural' => 'Documents',
        'args' => array(
            'public'                => true,
            'has_archive'           => false,
            'supports'              => array( 'title', 'editor', 'revisions', 'excerpt', 'thumbnail' ),
            'hierarchical'          => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'menu_icon'             => 'dashicons-media-text',
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'page',
        ),
    ),
  );

  foreach ($post_types as $post_type => $data) {
      $singular_name = $data['singular'];
      $plural_name = $data['plural'];
      $args = $data['args'];
      
      $labels = array(
          'name'                  => $plural_name,
          'singular_name'         => $singular_name,
          'menu_name'             => $plural_name,
          'all_items'             => 'All ' . $plural_name,
          'add_new'               => 'Add New',
          'add_new_item'          => 'Add New ' . $singular_name,
          'edit'                  => 'Edit',
          'edit_item'             => 'Edit ' . $singular_name,
          'new_item'              => 'New ' . $singular_name,
          'view_item'             => 'View ' . $singular_name,
          'search_items'          => 'Search ' . $plural_name,
          'not_found'             => 'No ' . $plural_name . ' found',
          'not_found_in_trash'    => 'No ' . $plural_name . ' found in Trash',
      );
      
      // Merge $args with $default_args
      $args = array_merge($args, array(
          'labels' => $labels,
      ));
      
      register_post_type( $post_type, $args );
  }
}

// $taxonomies = array(
//   'committees_cat' => array(
//       'singular' => 'Category',
//       'plural' => 'Categories',
//       'post_types' => array('council_meetings'),
//   ),
// );

// foreach ($taxonomies as $taxonomy => $data) {
//   $singular_name = $data['singular'];
//   $plural_name = $data['plural'];
//   $post_types = $data['post_types'];
  
//   $args = array(
//       'hierarchical'          => true,
//       'labels'                => array(
//           'name'              => $plural_name,
//           'singular_name'     => $singular_name,
//           'search_items'      => 'Search ' . $plural_name,
//           'all_items'         => 'All ' . $plural_name,
//           'parent_item'       => 'Parent ' . $singular_name,
//           'parent_item_colon' => 'Parent ' . $singular_name . ':',
//           'edit_item'         => 'Edit ' . $singular_name,
//           'update_item'       => 'Update ' . $singular_name,
//           'add_new_item'      => 'Add New ' . $singular_name,
//           'new_item_name'     => 'New ' . $singular_name . ' Name',
//           'menu_name'         => $plural_name,
//       ),
//       'show_ui'               => true,
//       'show_admin_column'     => true,
//       'query_var'             => true,
//       'rewrite'               => array( 'slug' => strtolower(str_replace(' ', '-', $plural_name)) ),
//   );

//   register_taxonomy( $taxonomy, $post_types, $args );
// }