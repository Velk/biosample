<div id="NA-view-content">
	<?php 
		$backup_rows = $rows;

		$rows = str_replace('<p><img', '<div class="NA-content-picture"><p><img', $rows);
		$rows = str_replace('</p><p', '</p></div><div class="NA-content-text"><p', $rows);
		$rows = str_replace('<div class="header article-header">', '<div class="NA-header header article-header">', $rows);
		$rows = str_replace('<img', '<img class="NA-picture"', $rows);
		$rows = str_replace('<p', '<p class="NA-paragraphe"', $rows);
		$rows = str_replace('<div class="node-content">', '', $rows);
		$rows = str_replace('<div class="section field field-name-body field-type-text-with-summary field-label-hidden">', '', $rows);
		$rows = str_replace('<div class="field-items">', '', $rows);
		$rows = str_replace('<div class="field-item odd" property="content:encoded">', '', $rows);
		$rows = str_replace('</p></div></div></div>  </div>', '</p>', $rows);

		echo "$rows";
		
		
	?>
</div>