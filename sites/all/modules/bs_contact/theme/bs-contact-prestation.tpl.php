<div id="All_coords_map">
  <div id="All_coords">
    <h1 class="contact-title"><?php echo render($title); ?></h1>
    <h2 class="contact-subtitle"><?php print t('Adresse'); ?></h2> <!-- Sous_Titre Aligner1 -->
    <p class='contact-content contact-adress'><?php echo render($adress); ?><br /><?php echo render($city); ?></p>
    <br />
    <h2 class="contact-subtitle"><?php print t('Tel / Fax'); ?></h2>
    <p class='contact-content'><?php echo render($telfax); ?></p>
    <br />
    <h2 class="contact-subtitle"><?php print 'Email'; ?></h2>
    <p class='contact-content'><?php echo render($mail); ?></p>
  </div>
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