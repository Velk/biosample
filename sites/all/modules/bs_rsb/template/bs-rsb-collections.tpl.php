<?php

$arrayFilters = array(
    '0' => array(
        'name' => 'Données anthropomorphiques',
        'filters' => array(
            'Sexe',
            'Age',
            'Taille',
            'Poids',
            'Ville de naissance',
            'IMC',
        ),
    ),
    '1' => array(
        'name' => 'Suivi des donneurs',
        'filters' => array(
            'Oui',
            'Non',
            'Formulaire annuel',
        ),
    ),
    '2' => array(
        'name' => 'Consentement',
        'filters' => array(
            'Consentement écrit',
            'Recherche génétique',
            'Non-opposition',
        ),
    ),
    '3' => array(
        'name' => 'Nature',
        'filters' => array(
            'Sang',
            'Lymphe',
            'Urine',
            'Tissus',
            'LCR',
            'Tumeur',
        ),
    ),
    '4' => array(
        'name' => 'Données associées',
        'filters' => array(
            'Glycémie',
            'Taux d\'hématocrite',
            'Alcoolémie',
            'Cholestérol',
        ),
    )
);

$arrayCollections = array(
    'numDept' => array('69','69','35','94','32'),
    'nameBiobank' => array(
        'Centre du Poney fringuant',
        'Biobanque de la Telle',
        'Point de collecte de la charnière',
        'Cohorte perseverance',
        'Sauvons nos forêts !'
    ),
    'projectBiobank' => array(
        'XB23',
        'Etude du SNPrs3092253',
        'Etude longitudinale de la population en Bretagne',
        'Suivi de la population générale',
        'Sauvegarde du patrimoine écosystèmique'
    ),
    'type' => array(
        'Cohorte épidémiologique (étude longitudinale)',
        'Cohorte épidémiologique (étude longitudinale)',
        'Cohorte épidémiologique (étude longitudinale)',
        'Cohorte épidémiologique (étude longitudinale)',
        'Cohorte épidémiologique (étude longitudinale)'
    ),
    'consentement' => array(
        'Consentement écrit',
        'Recherche génétique',
        'Non-opposition',
        'Recherche génétique',
        'Non-opposition'
    ),
    'accessCondition' => array(
        'NA',
        'NA',
        'NA',
        'NA',
        'NA'
    ),
    'patients' => array(
        '5000 femmes atteintes d’un cancer du sein en provenace du mexique et du costa rica.',
        '15000 hommes',
        '50 individus diabétiques',
        '2530 hommes et femmes',
        '27400 individus atteints de cataracte'
    ),
    'availability' => array(
        'Étude de chaques demandes destiné au secteur académique',
        'Étude de chaques demandes destiné au secteur académique',
        'Étude de chaques demandes destiné au secteur académique',
        'Étude de chaques demandes destiné au secteur académique',
        'Étude de chaques demandes destiné au secteur académique'
    ),
    'regne' => array(
        'animal',
        'vegetal',
        'humain',
        'microbiologie',
        'vegetal'
    )
);

?>

<div id="bs-rsb-container">
    <div id="bs-rsb-filters-container">
        <h2>FILTRES</h2>
        <button>Réinitialiser</button>
        <div id="bs-rsb-filters">
        <?php
            for($nb = 0; $nb < count($arrayFilters); $nb++) {
        ?>
                <div class="bs-rsb-filter">
                    <div class="bs-rsb-filter-title">
                        <?php
                            echo "<p>" . $arrayFilters[$nb]["name"] . "</p><i class=\"fa fa-angle-down\"></i>"
                        ?>
                    </div>
                    <div class="bs-rsb-filter-datas">
                        <div class="bs-rsb-filter-datas-search">
                            <input type="search" placeholder="Rechercher"><i class="fa fa-search"></i>
                        </div>
                        <div class="bs-rsb-filter-datas-checkboxes">
                    <?php
                        $nbFiltersCheckbox = count($arrayFilters[$nb]["filters"]);
                        for($nbC = 0; $nbC < $nbFiltersCheckbox; $nbC++) {
                    ?>
                            <div class="bs-rsb-filter-datas-checkbox">
                                <input type="checkbox">
                                <?php
                                    echo "<p>" . $arrayFilters[$nb]["filters"][$nbC] . "</p>";
                                ?>
                            </div>
                    <?php
                        }
                            if($nbFiltersCheckbox > 5){
                                echo "<button>Plus de critères</button>";
                            }
                    ?>
                        </div>
                    </div>
                </div>
        <?php
            }
        ?>
        </div>
    </div>

    <div id="bs-rsb-collections-container">
        <h2>COLLECTIONS</h2>
        <div>
            <div id="bs-rsb-families">
                <nav>
                    <ul>
                        <li>
                            <a href="#humain">Humain</a>
                        </li><!--
                        --><li>
                            <a href="#animal">Animal</a>
                        </li><!--
                        --><li>
                            <a href="#vegetal">Végétal</a>
                        </li><!--
                        --><li>
                            <a href="#microbiologie">Microbiologie</a>
                        </li>
                    </ul>
                </nav>
                <div id="bs-rsb-search">
                    <input type="search" placeholder="Rechercher"><i class="fa fa-search"></i>
                </div>
            </div>
            <div id="bs-rsb-collections">
            <?php
                for($i=0; $i < count($arrayCollections["numDept"]) ; $i++){
            ?>
                <div>
                    <?php
                    echo '<p class="col-biobank">' . $arrayCollections["nameBiobank"][$i] . '</p>';
                    echo '<p class="col-project-name">Nom du projet : ' . $arrayCollections["projectBiobank"][$i] . '</p>';
                    ?>
                    <div>
                        <p class="col-datas-name">Type de collection :</p><!--
                        --><p class="col-datas-values"><?php echo $arrayCollections["type"][$i]; ?></p>
                    </div>
                    <div>
                        <p class="col-datas-name">Statut consentement :</p><!--
                        --><p class="col-datas-values"><?php echo $arrayCollections["consentement"][$i]; ?></p>
                    </div>
                    <div>
                        <p class="col-datas-name">Conditions d’accès :</p><!--
                        --><p class="col-datas-values"><?php echo $arrayCollections["accessCondition"][$i]; ?></p>
                    </div>
                    <div>
                        <p class="col-datas-name">Patients :</p><!--
                        --><p class="col-datas-values"><?php echo $arrayCollections["patients"][$i]; ?></p>
                    </div>
                    <div>
                        <p class="col-datas-name">Disponibilité :</p><!--
                        --><p class="col-datas-values"><?php echo $arrayCollections["availability"][$i]; ?></p>
                    </div>
                    <p class="col-family-name" hidden><?php echo $arrayCollections["regne"][$i]; ?></p>
                </div>
            <?php
                }
            ?>
            </div>
        </div>
    </div>
</div>
