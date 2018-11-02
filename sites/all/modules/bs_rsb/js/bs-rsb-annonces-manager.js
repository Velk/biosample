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
                $(".node-rb-collections > div.node-content").prepend(
                    "<div id='bs-rsb-establishment-link'>" +
                        "<a href='/ressources-biologiques/home/etablissement/" + url_uid + "'><i class='fa fa-eye'></i> Fiche de l'établissement</a>" +
                    "</div>"
                );

                $(".page-title-wrap").remove();

                // var topLink = $("#bs-rsb-establishment-link").offset().top;
                // var topPageTitle = $(".page-title-wrap").offset().top + jQuery(".page-title-wrap").height();
                // var positionLink = topPageTitle - topLink;
                //
                // $("#bs-rsb-establishment-link").css({
                //    "position": "relative",
                //    "transform" : "translateY(" + positionLink + "px)",
                // });

            }

            /* Custom page title for /node/add/rb-collections */
            if( window.location.pathname.match(/^\/node\/add\/rb-collections$/) ){

                $(".page-title-wrap").css({
                   "background-image": "linear-gradient(#1e6a8e, #1e6a8e)",
                    "margin-bottom": "25px",
                });

                $(".page-title-wrap .container").css({
                   "padding": "5px 10px",
                });

                $(".page-title-wrap #page-title").text("Ajouter une nouvelle collection");

                $(".page-title-wrap #page-title").css({
                    "font-size": "25px",
                });

                $(".page-title-wrap").remove();

                $("#rb-collections-node-form #edit-actions").css("margin", "50px auto 0 auto");
            }

            /* Custom page title for /node/add/rb-collections */
            if( window.location.pathname.match(/^\/node\/[0-9]{0,10}\/edit$/) ) {

                $(".page-title-wrap").css({
                    "background-image": "none",
                    "background-color": "#1e6a8e",
                });

                $(".page-title-wrap .container").css({
                    "padding": "5px 10px",
                });

                $(".page-title-wrap #page-title").css({
                    "font-size": "25px",
                    "text-transform": "inherit",
                });

                $(".page-title-wrap #page-title > em").text("Modification de : ");

                $(".page-title-wrap #page-title > em").css({
                    "text-transform": "uppercase",
                    "font-style": "normal",
                });

                $(".page-title-wrap").remove();

                $("#edit-actions > span.edit-submit > input.form-submit").val("ENREGISTRER LES MODIFICATIONS");
            }

            /* Custom page title for /node/add/rb-collections */
            if( window.location.pathname.match(/^\/node\/[0-9]{0,10}\/delete$/) ) {

                $(".page-title-wrap").remove();

                $("#node-delete-confirm").css("margin", "50px auto");
            }

        }
    };
}(jQuery));
