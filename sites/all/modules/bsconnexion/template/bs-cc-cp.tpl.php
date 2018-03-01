<div class="cp-row" id="cp-header">
    <p class="cp-reference">Référence
    </p><p class="cp-name">Dénomination
    </p><p class="cp-packaging">Conditionnement
    </p><p class="cp-price">Prix HT
    </p><p class="cp-unit-price">Prix Unitaire HT
    </p><p class="cp-stock">Stock
    </p><p class="cp-image">Image</p>
</div>

<?php
foreach ($results_cataloguep as $result_cataloguep){
?>
    <div class="cp-row">
        <p class="cp-reference"><?php print($result_cataloguep->cp_reference) ?>
        </p><p class="cp-name"><?php print($result_cataloguep->cp_name) ?>
        </p><p class="cp-packaging"><?php print($result_cataloguep->cp_packaging) ?>
        </p><p class="cp-price"><?php print($result_cataloguep->cp_price) ?> €
        </p><p class="cp-unit-price"><?php print($result_cataloguep->cp_unit_price) ?> €
        <?php if($result_cataloguep->cp_stock != 0){ ?>
            </p><p class="cp-stock" id="cp-stock"><?php print($result_cataloguep->cp_stock) ?>
        <?php } ?>
        <?php if($result_cataloguep->cp_stock == 0){ ?>
            </p><p class="cp-stock" id="cp-stock-oos"><?php print($result_cataloguep->cp_stock) ?>
        <?php } ?>
        </p><p class="cp-image"><?php print($result_cataloguep->cp_image) ?></p>
    </div>
<?php
}

if(!isset($result_cataloguep)){
?>
    <p id="cp-empty">Votre catalogue personnalisé est vide ou une mise à jour étant en cours, merci de revenir dans quelques minutes.</p>
<?php
}else{
?>
<!--    <input type="search" id="cp-search"/>-->
<?php
}
?>

