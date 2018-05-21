<?php
/**
 * @file
 * controls load theme.
 */

require_once drupal_get_path('theme', 'tb_mollise') . '/inc/preprocess_functions.inc';
require_once drupal_get_path('theme', 'tb_mollise') . '/inc/theme_function_overrides.inc';

function tb_mollise_form_alter(&$form, &$form_state, $form_id) {
    if ($form_id == 'search_block_form') {
        // HTML5 placeholder attribute
        $form['search_block_form']['#attributes']['placeholder'] = t('Rechercher');
    }
}

/* Gael : Ajout de la métadonnées viewport pour faire fonctionner le responsive */
function tb_mollise_preprocess_html(&$vars) {
    $viewport = array(
        '#tag' => 'meta',
        '#attributes' => array(
            'name' => 'viewport',
            'content' => 'width=device-width, initial-scale=1',
        ),
    );
    drupal_add_html_head($viewport, 'viewport');

    foreach (array('head', 'styles', 'scripts') as $replace) {
        if (!isset($vars[$replace])) {
            continue;
        }
        $vars[$replace] = preg_replace('/(src|href|@import )(url\(|=)(")http(s?):/', '$1$2$3', $vars[$replace]);
    }
  $vars['scripts'] = str_replace("http://dev.biosample.fr/", "/", $vars['scripts']);
  $vas['styles'] = str_replace("http://dev.biosample.fr/", "/", $vars['styles']);
  $vas['page'] = str_replace("http://dev.biosample.fr/", "/", $vars['page']);

  drupal_add_library('system', 'ui');

  $options = array(
    'group' => JS_THEME,
  );
  drupal_add_js(drupal_get_path('theme', 'tb_mollise'). '/script.js', $options);
}
