Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.createTouchMenu = function(items) {
      items.children('a').each( function() {
	var $item = $(this);
        var tbitem = $(this).parent();
        $item.click( function(event){
          if ($item.hasClass('tb-megamenu-clicked')) {
            var $uri = $item.attr('href');
            window.location.href = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
            }
          }
        }).closest('li').mouseleave( function(){
          $item.removeClass('tb-megamenu-clicked');
          tbitem.removeClass('open');
        });
     });

  /* Debut - Gael | JS for the responsive menu */
      /* Display a div behindMenu to take the entire height of the screen */
      var touchMenu = 1;

      $("div.tb-megamenu>button").on("click", menuDisplayResponsive);

      function menuDisplayResponsive() {
          if ( touchMenu == 1 ) {
              $(".nav-collapse, .always-show, .collapse").append('<div id="behindMenu"></div>');
              $("#ccc-icon, .ccc-widget").css("z-index", "20");
              touchMenu = 2;
          } else {
              $("#behindMenu").remove();
              $("#ccc-icon, .ccc-widget").css("z-index", "9999");
              touchMenu = 1;
          }
      }

      /* Display the menu at the bottom of the headband */
      var tailleHeadband = $("#bs-cc-headband").height();

      // Place le menu responsive à une certaine distance
      $("div.tb-megamenu>button").click(function(){

          /* Affiche le menu de navigation en dessous du bandeau de connexion */
          $(".tb-megamenu .nav-collapse").css("top", tailleHeadband);

          /* Place les cookies en dessous du menu */
          $("#ccc-icon, .ccc-widget").css("z-index", "20");
      });
  /* Fin - Gael | JS for the responsive menu */

  }
  
  Drupal.TBMegaMenu.eventStopPropagation = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else if (window.event) {
      window.event.cancelBubble = true;
    }
  }  
  Drupal.behaviors.tbMegaMenuTouchAction = {
    attach: function(context) {
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(isTouch){
        $('html').addClass('touch');
        Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
      }
    }
  }
})(jQuery);


