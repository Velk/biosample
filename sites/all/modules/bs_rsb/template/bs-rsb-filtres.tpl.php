<div id="bs-rsb-container">
    <div id="bs-rsb-filters-container">
        <h2>FILTRES</h2>
        <button id="reinit-all-filters">Réinitialiser tous les filtres</button>
        <div id="bs-rsb-filters">
            <?php
            foreach ($resultsFC as $resultFC){
                ?>
                <div class="bs-rsb-filter">
                    <div class="bs-rsb-filter-title">
                        <?php
                        echo "<p>" . toSetRightString($resultFC->name) . "</p><i class='fa fa-plus'></i>" ."<p class='bs-rsb-filter-vid'>" . $resultFC->vid . "</p>"
                        ?>
                    </div>
                </div>
                <?php
            }
            ?>
        </div>
    </div>
</div>

<?php

/**
 * @param $string
 * @return mixed
 */
function toSetRightString($string) {

    $string = explode("RB - ", $string)[1];

    return $string;
}

?>