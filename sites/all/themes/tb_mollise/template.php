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