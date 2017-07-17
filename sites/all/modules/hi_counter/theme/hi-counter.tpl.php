<div id="hi-counter">
  <div class="hi-counter-content">
    <div class="number_follow">
      <div class="follow">
        <?php echo t('!followers followers', array('!followers' => '<div class="progress-label"></div>'));?>
      </div>
    </div>
    <div class="progressbar">
    </div>
    <div class="help-us">
      <?php echo t('Help us to reach !target', array('!target' => '<strong>' . $target . '</strong>'));?>
    </div>
    <?php if (isset($image)): ?>
      <div class="hi-counter-picture">
        <?php print render($image); ?>
      </div>
    <?php endif; ?>
  </div>
</div>
