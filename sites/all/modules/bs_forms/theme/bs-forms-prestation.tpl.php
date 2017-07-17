<div id="pres-form">
  <?php if (isset($title)): ?>
    <div class="title">
      <h2>
        <?php print render($title); ?>
      </h2>
    </div>
  <?php endif; ?>
  <?php if (isset($user_status)): ?>
    <div class="user_status">
      <?php print nl2br($user_status); ?>
    </div>
  <?php endif; ?>
  <?php if (isset($bs_form)): ?>
    <div class="user_status">
      <?php print nl2br($bs_form); ?>
    </div>
  <?php endif; ?>
</div>