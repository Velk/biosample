<div id="bs-cc-user-profil-biosample-contact">
    <?php if (!empty($bs_contact_civilite) || !empty($bs_contact_prenom) || !empty($bs_contact_nom)): ?>
    <div id="biosample-contact-infos-div">
        <i class="fa fa-user" aria-hidden="true"></i>
            <p class="biosample-contact">
                <?php print render($bs_contact_civilite); ?>
                <?php print render($bs_contact_prenom); ?>
                <?php print render($bs_contact_nom); ?>
            </p>
    </div><?php endif; ?><?php if (!empty($bs_contact_telephone)): ?><div id="biosample-contact-phone-div">
        <i class="fa fa-phone" aria-hidden="true"></i><p class="biosample-contact"><?php print render($bs_contact_telephone); ?></p>
        </div><?php endif; ?><?php if (!empty($bs_contact_mail)): ?><div id="biosample-contact-mail-div">
        <i class="fa fa-envelope" aria-hidden="true"></i><p class="biosample-contact"><?php print render($bs_contact_mail); ?></p>
    </div><?php endif; ?>

    <?php
    if (
            empty($bs_contact_civilite)
            && empty($bs_contact_prenom)
            && empty($bs_contact_nom)
            && empty($bs_contact_telephone)
            && empty($bs_contact_mail)
    ): ?>
    <p id="biosample-contact-disclaimer">
        Nous allons traiter votre inscription dans les meilleurs délais.<br>
        Un commercial vous sera attribué très prochainement.
    </p>
    <?php endif; ?>

</div>
