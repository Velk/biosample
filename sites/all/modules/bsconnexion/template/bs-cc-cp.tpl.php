<?php
// Check if there are results
if( $is_row_result ) {
?>
    <div class="cp-row" id="cp-header">
        <p class="cp-reference">Référence
        </p><p class="cp-name">Dénomination
        </p><p class="cp-packaging">Conditionnement
        </p><p class="cp-price">Prix HT
        </p><p class="cp-unit-price">Prix Unitaire HT
        </p><p class="cp-stock">Stock
        <!--    </p><p class="cp-image">Image-->
        </p><p class="cp-quantity">Quantité
        </p><p class="cp-checkbox"><i class="fa fa-shopping-cart"></i></p>
    </div>
<?php
    print($form_cataloguep);
}else{
?>
    <p id="cp-empty">Votre catalogue personnalisé est vide ou une mise à jour est en cours. Merci de revenir dans quelques minutes.</p>
<?php
}
?>