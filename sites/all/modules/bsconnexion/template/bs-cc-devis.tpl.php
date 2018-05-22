<!-- Récapitulatif des demandes en cours -->
<div id="bs-cc-quote-request-container">
    <h2>Récapitulatif des demandes en cours.</h2>

    <?php

        // Declare a multidimensional table containing an other table
        // who's going to contain values : nid, sid
        $primary_tab = array();

        foreach ($results_submissions as $result_submission){

            // Declare and empty the table containing values : nid, sid
            $tab_test = array();

            // Add values nid and sid in the table
            array_push($tab_test,$result_submission->nid);
            array_push($tab_test,$result_submission->sid);

            // Add a table containing the values (nid, sid) in the multidimensional table
            $primary_tab[] = $tab_test;
    ?>
            <div class="bs-cc-quote-request">
                <p class="bs-cc-quote-request-title"><?php print($result_submission->title); ?></p>
                <i class="fa fa-long-arrow-right" id="bs-cc-qr-arrow"></i>
                <p class="bs-cc-quote-request-data"><?php print($result_submission->data); ?></p>
                <div class="bs-cc-quote-request-actions-container">
                    <div class="bs-cc-quote-request-actions" id="bs-cc-qra-consult">
                        <a href="<?php print("/node/" . $result_submission->nid . "/submission/" . $result_submission->sid);?>"><i class="fa fa-eye"></i></a>
                    </div><!--
                    --><div class="bs-cc-quote-request-actions" id="bs-cc-qra-edit">
                        <a href="<?php print("/node/" . $result_submission->nid . "/submission/" . $result_submission->sid . "/edit");?>"><i class="fa fa-pencil"></i></a>
                    </div><!--
                    --><div class="bs-cc-quote-request-actions" id="bs-cc-qra-delete">
                        <a href="<?php print("/node/" . $result_submission->nid . "/submission/" . $result_submission->sid . "/delete");?>"><i class="fa fa-trash"></i></a>
                    </div>
                </div>
                <p class="bs-cc-qr-nid" hidden><?php print($result_submission->nid); ?></p>
                <p class="bs-cc-qr-sid" hidden><?php print($result_submission->sid); ?></p>
            </div>

    <?php
        // End of the foreach
        }
    ?>

    <button id="bs-cc-qr-button">DEMANDER MON DEVIS</button>
</div>

    <?php
        // Check if URL parameters is send=true
        // that's to say when user clicked on the button above
        if($_GET['send'] == "true"){

            if(!empty($primary_tab)){
                // Declare a string to store url of client quotes
                $url_consult_devis = "";

                // Loop to add each quotes
                // Refer to the multidimensional tab : $primary_tab
                for($i = 0 ; $i < sizeof($primary_tab) ; $i++){

                    switch($_SERVER['SERVER_NAME']){
                        case 'fr.biosample.local' :
                            $url_consult_devis = $url_consult_devis . "http://" . $_SERVER['SERVER_NAME'] . "/node/" . $primary_tab[$i][0] . "/submission/" . $primary_tab[$i][1] . "\n\n";
                            break;
                        default :
                            $url_consult_devis = $url_consult_devis . "https://" . $_SERVER['SERVER_NAME'] . "/node/" . $primary_tab[$i][0] . "/submission/" . $primary_tab[$i][1] . "\n\n";
                    }
                    // Refer to bsconnexion_update_submissions_values() function
                    // Contains queries to update status of the submission
                    bsconnexion_update_submissions_values($primary_tab, $i);
                }

                bsconnexion_sending_mail($url_consult_devis);

            }else{
                drupal_set_message("Veuillez remplir des formulaires de demande de devis dans votre onglet : Catalogue Général.");
            }
        }

    ?>

<!-- Récapitulatif des devis demandés -->
<div id="bs-cc-quote-container">
    <h2>Récapitulatif des devis demandés.</h2>

    <?php
    foreach ($results_submissions_submitted as $result_submission_submitted){
    ?>
        <div class="bs-cc-quote-request">
            <i class="fa fa-check-circle" id="bs-cc-qr-arrow"></i>
            <p class="bs-cc-quote-request-title"><?php print(date("d / m / y - G:i", $result_submission_submitted->submitted)); ?></p>
            <i class="fa fa-long-arrow-right" id="bs-cc-qr-arrow"></i>
            <p class="bs-cc-quote-request-title"><?php print($result_submission_submitted->title); ?></p>
            <i class="fa fa-long-arrow-right" id="bs-cc-qr-arrow"></i>
            <p class="bs-cc-quote-request-data"><?php print($result_submission_submitted->data); ?></p>
<!--            <div class="bs-cc-quote-request-actions-container">-->
<!--                <div class="bs-cc-quote-request-actions" id="bs-cc-qra-consult">-->
<!--                    <a href="--><?php //print("/node/" . $result_submission_submitted->nid . "/submission/" . $result_submission_submitted->sid);?><!--"><i class="fa fa-eye"></i></a>-->
<!--                </div>-->
<!--                    <div class="bs-cc-quote-request-actions" id="bs-cc-qra-edit">-->
<!--                    <a href="--><?php //print("/node/" . $result_submission_submitted->nid . "/submission/" . $result_submission_submitted->sid . "/edit");?><!--"><i class="fa fa-pencil"></i></a>-->
<!--                </div>-->
<!--                    <div class="bs-cc-quote-request-actions" id="bs-cc-qra-delete">-->
<!--                    <a href="--><?php //print("/node/" . $result_submission_submitted->nid . "/submission/" . $result_submission_submitted->sid . "/delete");?><!--"><i class="fa fa-trash"></i></a>-->
<!--                </div>-->
<!--            </div>-->
<!--            <p class="bs-cc-qr-nid" hidden>--><?php //print($result_submission_submitted->nid); ?><!--</p>-->
<!--            <p class="bs-cc-qr-sid" hidden>--><?php //print($result_submission_submitted->sid); ?><!--</p>-->
        </div>

    <?php
    // End of the foreach
    }
    ?>
</div>
