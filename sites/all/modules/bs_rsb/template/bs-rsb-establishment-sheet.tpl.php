<div id="bs-rsb-establishment-container">
    <div id="bs-rsb-bs-contact">
        <h2>Votre contact BioSample</h2>
        <?php
        foreach ($results_bs_contact as $result) {

            if(
                empty($result->bs_contact_civility) &&
                empty($result->bs_contact_firstname) &&
                empty($result->bs_contact_lastname)
            ) {
        ?>
                <p>Votre contact BioSample n'a pas été attribué.</p>
        <?php
            }else{
        ?>
                <p class="es-bs-contact">
                    <i class="fa fa-user"></i>
                    <?php
                    print(
                        $result->bs_contact_civility . " " .
                        $result->bs_contact_firstname . " " .
                        $result->bs_contact_lastname
                    );
                    ?>
                </p><p class="es-bs-contact">
                    <i class="fa fa-envelope"></i>
                    <?php print($result->bs_contact_mail); ?>
                </p><p class="es-bs-contact">
                    <i class="fa fa-phone"></i>
                    <?php print($result->bs_contact_phone); ?>
                </p>
        <?php
            }
        }
        ?>
    </div><div id="bs-rsb-update-datas">
        <h2>Modification de votre fiche d'établissement</h2>
        <?php print($update_establishment_sheet);?>
    </div>
</div>
