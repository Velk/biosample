(function ($) {
    Drupal.behaviors.bs_rsb_collections_contact = {
        attach: function (context, settings) {

            $(document).ready(function(){

                $("#contact-container > button").click(function(){
                   $("#contact-popup-container").show();
                });

                $("#contact-popup > i#exit").click(function(){
                    $("#contact-popup-container").hide();
                });

                if(
                    $("#bs-rsb-collections-contact-form input").hasClass("error") ||
                    $("#bs-rsb-collections-contact-form select").hasClass("error") ||
                    $("#bs-rsb-collections-contact-form textarea").hasClass("error")
                ){
                    $("#contact-popup-container").show();
                }

            });

        }
    };
}(jQuery));
