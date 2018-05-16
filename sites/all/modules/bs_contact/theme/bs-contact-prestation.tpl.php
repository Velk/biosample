<div id="All_coords_map">
    <div id="bscontact_gmap">
        <?php echo render($map_script1); ?>
        <?php echo render($map_script2); ?>
        <?php echo render($map_script3); ?>
        <div id='gmap_canvas' style='height:650px;'></div>
        <div id="lien-map">
            <a href='http://maps-generator.com/fr'>#</a>
        </div>
    </div>
</div>
<div id="All_coords">
    <div>
        <h1 class="contact-title"><?php echo render($title); ?></h1>
        <i class="fa fa-paper-plane"></i>
    </div><div>
    <?php
        // If the description isn't set, display BioSample's contact information
        if(empty($description)) {
    ?>
            <div class="contact-address">
                <p><?php echo render($adress); ?></p>
                <p><?php echo render($city); ?></p>
            </div>
            <p class='contact-tel'>
                <?php echo render($telfax); ?>
            </p><p class='contact-email'>
                <?php echo render($mail); ?>
            </p>
    <?php
        }else{
    ?>
            <p><?php echo render($description); ?></p>
    <?php
        }
    ?>

    </div>
</div>