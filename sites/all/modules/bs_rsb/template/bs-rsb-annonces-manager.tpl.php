<?php
// If user has created an establishment sheet
if($created){
?>
    <div id="bs-rsb-annonce-header">
        <a href="/node/add/rb-collections" id="add-annonce"><i class="fa fa-plus"></i>Ajouter une annonce</a>
        <a href="/ressources-biologiques/home" id="consult-map"><i class="fa fa-map-marker"></i>Cartographie des ressources biologiques</a>
    </div>
    <?php
    $isResultValues = false;
    ?>
    <div class="bs-rsb-cards-container">
        <?php
        foreach ($results_node_list as $result_node_list){

            $isResultValues = true
            ?>

                <div class="bs-rsb-cards">
                    <div class="bs-rsb-card-title">
                        <i class="fa fa-file"></i><p><?php echo $result_node_list->title; ?></p>
                    </div>
                    <div class="bs-rsb-card-content">
                        <p><?php echo $result_node_list->field_nom_collection_value; ?></p>
                    </div>
                    <div class="bs-rsb-card-action-edit">
                        <a href="/node/<?php echo $result_node_list->nid; ?>/edit" title="Modifier l'annonce">Modifier <i class="fa fa-pencil"></i></a>
                    </div>
                </div>
            <?php
        }
        ?>
    </div>
    <?php
    if($isResultValues == false){
        ?>

        <div id="bs-rsb-no-annonce">
            <p>Aucune annonce n'a été créée.</p>
            <p>Vous pouvez créer des annonces en cliquant sur le bouton ci-dessus, nommé
                <em>"AJOUTER UNE ANNONCE"</em>
                ou en <a href="/node/add/rb-collections">Cliquant ici</a>
            </p>
        </div>

        <?php
    }
    ?>
<?php
// If user has NOT created an establishment sheet
}else{
?>
    <div id="bs-rsb-no-annonce-header">
        <a href="/ressources-biologiques/home"><i class="fa fa-map-marker"></i>Cartographie des ressources biologiques</a>
    </div>
    <div id="bs-rsb-es-notcreated">
        <p>
            Pour ajouter et gérer vos annonces, veuillez créer votre fiche
            d'organisme en cliquant sur le lien ci-dessous.
        </p>
        <a href="/utilisateur/ress_bio/etablissement">Créer ma fiche d'organisme</a>
    </div>
<?php
}
?>



<!--        <div class="bs-rsb-annonces">-->
<!--            <div class="bs-rsba-nom-collection">-->
<!--                <p>--><?php //echo $result_node_list->field_nom_collection_value; ?><!--</p>-->
<!--            </div>-->
<!--            <div class="bs-rsba-nom-projet">-->
<!--                <a href="/node/--><?php //echo $result_node_list->nid; ?><!--/edit" title="--><?php //echo $result_node_list->title; ?><!--">--><?php //echo $result_node_list->title; ?><!--</a>-->
<!--            </div>-->
<!--        </div>-->