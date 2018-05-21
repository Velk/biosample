(function ($) {
    Drupal.behaviors.bs_rsb_establishment_update = {
        attach: function (context, settings) {

            // When user click on the span
            $("#bs-rsb-preview-img > span").click(function(){

                // Hide or show image
                $("#bs-rsb-preview-img > img ").toggle();

                // Change span text
                if($("#bs-rsb-preview-img > img ").is(":visible")){
                    $("#bs-rsb-preview-img > span ").text("Caché");
                }else{
                    $("#bs-rsb-preview-img > span ").text("Voir");
                }

            });

        }
    };
}(jQuery));
