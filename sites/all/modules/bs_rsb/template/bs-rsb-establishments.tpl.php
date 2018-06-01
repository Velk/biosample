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
        <div id="es-status">
            <p>Status : <?php echo $result->status; ?></p>
        </div>
        <div id="es-name">
            <p><i class="fa fa-bookmark"></i><?php echo $result->name; ?></p>
        </div>
        <h3>Coordonnées</h3>
        <div id="es-address">
            <p><?php echo $result->address; ?></p>
        </div>
        <div id="es-city">
            <p><?php echo $result->city; ?></p>
        </div>
        <div id="es-postalcode">
            <p><?php echo $result->postal_code; ?></p>
        </div>
    </div>
    <div id="presentation">
        <h2 id="label-presentation">Présentation</h2>
        <div><?php echo $result->presentation; ?></div>
    </div>
<?php
}
?>
</div>