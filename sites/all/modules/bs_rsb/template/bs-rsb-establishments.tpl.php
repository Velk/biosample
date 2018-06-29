<div id="bs-rsb-establishments">

<?php
// Browse results
foreach ($results as $result) {
?>
    <div id="datas-sheet">
        <?php
        // If there is an image
        if($image) {
            ?>
            <div id="es-image" style="background-image: url('/sites/default/files/<?php echo $image; ?>')"></div>
            <?php
        }
        ?>
        <div id="es-name">
            <p><i class="fa fa-bookmark"></i><?php echo $result->name; ?></p>
        </div>
        <div id="es-status">
            <p>Statut : <?php echo $result->status; ?></p>
        </div>

        <h3 id="es-label-organism">Organisme</h3>
        <div id="es-country">
            <p>
                <i class="fa fa-globe" aria-hidden="true"></i>
                <?php echo $resultCountry; ?>
            </p>
        </div>
        <?php
        if($result->organism_type){
        ?>
            <div id="es-type">
                <span>Type</span>
                <p><?php echo $result->organism_type; ?></p>
            </div>
        <?php
        }
        if($result->organism_theme){
        ?>
        <div id="es-theme">
            <span>Thematique</span>
            <p><?php echo $result->organism_theme; ?></p>
        </div>
        <?php
        }
        ?>
        <h3 id="es-label-activities">Activités</h3>
        <div id="es-activities">
            <?php
            foreach ($activities as $activity){
                echo '<p><i class="fa fa-circle-thin" aria-hidden="true"></i>' . $activity . '</p>';
            }
            ?>
        </div>
        <?php
        if($result->organism_activities_more) {
        ?>
        <h3 id="es-label-activities-more">Activités complémentaires</h3>
        <div id="es-activities-more">
            <p><?php echo $result->organism_activities_more; ?></p>
        </div>
        <?php
        }
        ?>
    </div>
    <div id="presentation">
        <h2 id="label-presentation">Présentation</h2>
        <div><?php echo $result->presentation; ?></div>
    </div>
<?php
}
?>
</div>