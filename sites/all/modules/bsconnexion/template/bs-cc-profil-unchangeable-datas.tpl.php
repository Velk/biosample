<div id="bs-cc-user-profil-unchangeables-datas">
    <?php if (isset($affiliation_societe)): ?>
        <div class="div-unchangeable-datas">
            <p>Société :</p><p class="unchangeable-datas"><?php print render($affiliation_societe); ?></p>
        </div>
    <?php endif; ?>
    <?php if (isset($siren)): ?>
        <div class="div-unchangeable-datas">
            <p>SIREN :</p><p class="unchangeable-datas"><?php print render($siren); ?></p>
        </div>
    <?php endif; ?>
    <?php if (isset($adresse)): ?>
        <div class="div-unchangeable-datas">
            <p>Adresse :</p><p class="unchangeable-datas"><?php print render($adresse); ?></p>
        </div>
    <?php endif; ?>
    <?php if (isset($ville)): ?>
        <div class="div-unchangeable-datas">
            <p>Ville :</p><p class="unchangeable-datas"><?php print render($ville); ?></p>
        </div>
    <?php endif; ?>
    <?php if (isset($code_postal)): ?>
        <div class="div-unchangeable-datas">
            <p>Code postal :</p><p class="unchangeable-datas"><?php print render($code_postal); ?></p>
        </div>
    <?php endif; ?>
</div>