<div id="bs-rsb-establishments">
    <?php
    // If there is an image
    if($image) {
        ?>
        <div id="establishment-image" style="background-image: url('/sites/default/files/<?php echo $image; ?>')"></div>
        <?php
    }
    ?>
<?php
// Browse results
foreach ($results as $result) {
?>
    <div id="datas-sheet">
        <div>
            <h2>Fiche d'établissement</h2>
            <div>
                <p class="label">Nom : </p><p class="data"><?php echo $result->name; ?></p>
            </div>
            <div>
                <p class="label">Adresse : </p><p class="data"><?php echo $result->address; ?></p>
            </div>
            <div>
                <p class="label">Ville : </p><p class="data"><?php echo $result->city; ?></p>
            </div>
            <div>
                <p class="label">Code postal : </p><p class="data"><?php echo $result->postal_code; ?></p>
            </div>
            <div>
                <p class="label">Status : </p><p class="data"><?php echo $result->status; ?></p>
            </div>
        </div>
    </div>
    <div id="presentation">
        <h2>Présentation :</h2>
        <div><?php echo $result->presentation; ?></div>
    </div>
<?php
}
?>
</div>