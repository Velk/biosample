(function ($) {
    Drupal.behaviors.bs_rsb_establishments = {
        attach: function (context, settings) {

            $(document).ready(function(){

                // function setImageHeight(){
                //
                //     // Distance between the top of the window and the top of the image
                //     var topImageContainer = $("#establishment-image").offset().top;
                //     // Window height
                //     var windowHeight = $(window).height();
                //     // Calcul the new height of the image
                //     var heightImageContainer = windowHeight - topImageContainer;
                //
                //     // Set the new height of the image
                //     $("#establishment-image").css("height", heightImageContainer);
                // }
                //
                // // Wait 50 milliseconds before run function
                // // Like that the page is loaded and the values retrieved are right
                // setTimeout(setImageHeight, 50);

                $(".page-title-wrap").remove();

            });

        }
    };
}(jQuery));
