<?php

    if(!empty($nameParent)) {
        print '<div id="bs-cg-parent-container">';

            /* Redirect to the first level */
            print '<i id="bs-cg-parent-top" class="fa fa-home" aria-hidden="true"></i>';
            print '<i class="fa fa-chevron-right" aria-hidden="true"></i>';

            /* Redirect to the element */
            if(!empty($name3Parent)){
                print '<div class="bs-cg-parent-element-container">';
                print '<p hidden class="bs-cg-element-id">' . $tid3Parent . '</p>';
                print '<button class="bs-cg-nameParent">' . $name3Parent . '</button>';
                print '</div>';
                print '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
            }

            /* Redirect to the element */
            if(!empty($name2Parent)) {
                print '<div class="bs-cg-parent-element-container" id="bs-cg-last-parent">';
                print '<p hidden class="bs-cg-element-id">' . $tid2Parent . '</p>';
                print '<button class="bs-cg-nameParent">' . $name2Parent . '</button>';
                print '</div>';
                print '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
            }

            /* The last element selected */
            print '<div class="bs-cg-parent-element-container">';
            print '<p hidden class="bs-cg-element-id">' . $tidParent . '</p>';
            print '<button class="bs-cg-nameParent bs-cg-element-active">' . $nameParent . '</button>';
            print '</div>';

        print '</div>';
    }
?>

<div id="bs-cg-container">
    <?php

    /* If the element selected IS NOT a leaf (last child of the hierarchy) */
        if($leaf == FALSE) {
            /* Display children elements */
            foreach ($results_cg_datas as $cg_datas) {
                // If description (thus the image) isn't set, it doesn't display the element
                if (!empty($cg_datas->description)) {
                    print '<div class="bs-cg-element-container">';
                    print '<p hidden class="bs-cg-element-id">';
                    print $cg_datas->tid;
                    print '</p>';
                    print '<p class="bs-cg-element-name">';
                    print $cg_datas->name;
                    print '</p>';
                    print $cg_datas->description;
                    print '<div class="bs-cg-cover"></div>';
                    print '</div>';
                }
            }
            /* If the element selected IS a leaf (last child of the hierarchy) */
        }else{

            /* Display children elements (parents of the leaf) */
            foreach ($results_cg_datas_leaf as $cg_datas_leaf) {
                // If description (thus the image) isn't set, it doesn't display the element
                if(!empty($cg_datas_leaf->description)){
                    print '<div class="bs-cg-element-container">';
                    print '<p hidden class="bs-cg-element-id">';
                    print $cg_datas_leaf->tid;
                    print '</p>';
                    print '<p class="bs-cg-element-name">';
                    print $cg_datas_leaf->name;
                    print '</p>';
                    print $cg_datas_leaf->description;
                    print '<div class="bs-cg-cover"></div>';
                    print '</div>';
                }
            }

            print "<p id='leaf-true' hidden>leaf</p>";
        }
    ?>

</div>
