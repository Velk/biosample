<div id="All_coords_map">
  <div id="All_coords">
      <p class="Titre">
        <?php echo render($cood_title); ?>
      </p>
      <p class="Sous_Titre Aligner1">
        <?php echo render($cood_adr_title); ?>
      </p>
      <p class='Contenu Aligner1'>
        <?php echo render($cood_adr_content1); ?>
      </p>
      <p class='Contenu Aligner1 Special1'>
        <?php echo render($cood_adr_content2); ?>
      </p>
      <br />
      <p class="Sous_Titre Aligner1">
        <?php echo render($cood_tf_title); ?>
      </p>
      <p class='Contenu Aligner1'>
        <?php echo render($cood_tf_content); ?>
      </p>
      <br />
      <p class="Sous_Titre Aligner1">
        <?php echo render($cood_mail_title); ?>
      </p>
      <p class='Contenu Aligner1 Special2'>
        <?php echo render($cood_mail_content); ?>
      </p>
  </div>
  <div id="bscontact_gmap">
    <?php echo render($map_script1); ?>
    <?php echo render($map_script2); ?>
    <?php echo render($map_script3); ?>
    <div id='gmap_canvas' style='height:450px;'></div>
    <div id="lien-map">
      <a href='http://maps-generator.com/fr'>#</a>
    </div>
  </div>
</div>