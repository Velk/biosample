(function ($) {
    Drupal.behaviors.tb_mollise = {
        attach: function (context, settings) {
            // Code to be run on page load, and
            // on ajax load added here

            /* Start - Gael | responsive img "Qui sommes-nous" page */
            /* Class "who-r-u-img" were added in the body of the Basic page Qui sommes-nous*/
            if(screen.width <= 700 && $(".who-r-u-img").is(":visible")){
                $(".who-r-u-img").width(screen.width);
                var offsetLeftImg = $(".who-r-u-img").offset().left;
                $(".who-r-u-img").css("margin-left", -offsetLeftImg);
                $(".who-r-u-img").css("height", "auto");
            }else{
                $(".who-r-u-img").width("100%");
                $(".who-r-u-img").height("auto");
            }

            /* Start - Gael | responsive img "Qui sommes-nous" page */

        }
    };
}(jQuery));