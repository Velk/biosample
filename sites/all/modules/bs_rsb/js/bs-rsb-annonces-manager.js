(function ($) {
    Drupal.behaviors.bs_rsb_annonces_manager = {
        attach: function (context, settings) {


            /* If client account menu is visible on the page */
            if($("#block-bsconnexion-user-client-account-menu").is(":visible")){
                // Hide the page title
                $(".page-title-wrap").hide();
                // Set the margin top of the main content to 50px
                $("div#main-wrapper").css("margin-top", "50px");
            }else{
                // Show the page title
                $(".page-title-wrap").show();
                // Set the margin top of the main content to 0px
                $("div#main-wrapper").css("margin-top", "0");
            }

            // Check the URL pathname. If user is on collection sheet
            if(
                window.location.pathname.match(/^\/ressources-biologiques\/home\/.*\/[0-9]{0,10}$/) &&
                !window.location.pathname.match(/^\/ressources-biologiques\/home\/etablissement\/[0-9]{0,10}$/)
            ){

                // Retrieve the uid of the author of the node
                var url = window.location.pathname;
                var url_split = url.split("/");
                var url_uid = url_split["4"];

                // Add a link to the establishment author
                $(".node-rb-collections").prepend(
                    "<div id='bs-rsb-establishment-link'>" +
                        "<a href='/ressources-biologiques/home/etablissement/" + url_uid + "'><i class='fa fa-eye'></i> Fiche de l'établissement</a>" +
                    "</div>"
                );

                var topLink = $("#bs-rsb-establishment-link").offset().top;
                var topPageTitle = $(".page-title-wrap").offset().top + jQuery(".page-title-wrap").height();
                var positionLink = topPageTitle - topLink;

                $("#bs-rsb-establishment-link").css({
                   "position": "relative",
                   "transform" : "translateY(" + positionLink + "px)",
                });

            }

        }
    };
}(jQuery));
