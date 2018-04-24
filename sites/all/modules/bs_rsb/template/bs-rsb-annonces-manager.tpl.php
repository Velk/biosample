<?php
// If user has created an establishment sheet
if($created){
?>
    <div id="bs-rsb-add-annonce">
        <a href="/node/add/rb-collections"><i class="fa fa-plus"></i>Ajouter une annonce</a>
        <a href="/ressources-biologiques/home"><i class="fa fa-plus"></i>Cartographie des ressources biologiques</a>
    </div>

    <?php
    foreach ($results_node_list as $result_node_list){
        ?>
        <div class="bs-rsb-annonces">
            <div class="bs-rsba-nom-projet">
                <p><?php echo $result_node_list->title; ?></p>
            </div>
            <div class="bs-rsba-nom-collection">
                <a href="/node/<?php echo $result_node_list->nid; ?>/edit" title="<?php echo $result_node_list->field_nom_collection_value; ?>"><?php echo $result_node_list->field_nom_collection_value; ?></a>
            </div>
        </div>
        <?php
    }
    ?>
<?php
// If user has NOT created an establishment sheet
}else{
?>
    <div id="bs-rsb-add-annonce">
        <a href="/ressources-biologiques/home"><i class="fa fa-plus"></i>Cartographie des ressources biologiques</a>
    </div>
    <div id="bs-rsb-es-notcreated">
        <p>
            Pour ajouter et gérer vos annonces, veuillez créer votre fiche
            d'établissement en cliquant sur le lien ci-dessous.
        </p>
        <a href="/utilisateur/ress_bio/etablissement">Créer ma fiche d'établissement</a>
    </div>
<?php
}
?>



