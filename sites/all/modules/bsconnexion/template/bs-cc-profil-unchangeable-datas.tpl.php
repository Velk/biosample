<div id="bs-cc-user-profil-unchangeables-datas">
        <div class="div-unchangeable-datas">
            <p>Société :</p><p class="unchangeable-datas"><?php print render($affiliation_societe); ?></p>
        </div>
        <div class="div-unchangeable-datas">
            <p>SIREN :</p><p class="unchangeable-datas"><?php print render($siren); ?></p>
        </div>
        <div class="div-unchangeable-datas">
            <p>Adresse :</p><p class="unchangeable-datas"><?php print render($adresse); ?></p>
        </div>
        <div class="div-unchangeable-datas">
            <p>Ville :</p><p class="unchangeable-datas"><?php print render($ville); ?></p>
        </div>
        <div class="div-unchangeable-datas">
            <p>Code postal :</p><p class="unchangeable-datas"><?php print render($code_postal); ?></p>
        </div>
        <div class="div-unchangeable-datas">
            <?php if (!empty($payment_method)): ?>
                <p>Modalités de paiement :</p><p class="unchangeable-datas"><?php print render($payment_method); ?></p>
            <?php endif; ?>
            <?php if (empty($payment_method)): ?>
                <p>Modalités de paiement :</p><p class="unchangeable-datas">Non attribué</p>
            <?php endif; ?>
        </div>
</div>

<?php if (!empty($client_code)): ?>
<div class="div-unchangeable-datas" id="div-unchangeable-datas-client-code">
    <p>Code client : </p><p class="unchangeable-datas"><?php print render($client_code); ?></p>
</div>
<?php endif; ?>