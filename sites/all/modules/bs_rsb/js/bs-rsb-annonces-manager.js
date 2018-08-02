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

                // Call colonRemoval function
                colonRemoval();

                // Call setRegneToCapitalize function
                setRegneToCapitalize();

                // Call addProjectName function
                addProjectName()
            }

            /* Remove colon for "RB collections" teaser content type */
            function colonRemoval(){

                // For every field label excepted the one belonging to organism name
                $(".node-rb-collections div:not('.field-name-field-nom-organisme') > h3.field-label").each(function(){

                    // Get text and splice it in order to remove the space and the colon at the end
                    var newText = $(this).text().slice(0,-2);

                    // Display new text
                    $(this).text(newText);
                });

                /* Criterias - Remove colon */
                $(".node-rb-collections .group-criteres > .fieldset-content > .field > .field-label").each(function(){

                    // Get text and splice it in order to remove the space and the colon at the end
                    var newText = $(this).text().slice(0,-2);

                    // Display new text
                    $(this).text(newText);
                })
            }

            /* Set to uppercase the first character of Regne (Animal, Microbio, Végétal, Humain) */
            function setRegneToCapitalize(){

                // Set to capitalize
                $(".node-rb-collections div.field-name-field-regne div.field-item").css("text-transform", "capitalize");
            }

            function addProjectName(){

                // Split url to retrieve project name
                var projectName = window.location.pathname.split("/")[3];
                // Replace every dash by space
                projectName = projectName.replace(/-/g, ' ');
                // Set the first char to uppercase
                projectName = projectName.charAt(0).toUpperCase() + projectName.substr(1);

                // Add a link to the establishment author
                $(".node-rb-collections > div.node-content").prepend(
                    "<div class='section field' id='project-name'>" +
                    "<h3 class='field-label'>Nom du projet</h3>" +
                    "<div class='field-items'>" +
                    "<div class='field-item odd'> " + projectName + "</div></div></div>"
                );

                $(".node-rb-collections .field-name-field-nom-collection").attr('style', 'padding-top: 10px !important;');
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

                // Browse the menu
                $("ul.tabs.primary > li").each(function(){

                    // Check if the link text is Voir and if the href link matches the url below
                    if(
                        $(this).children("a").text() === "Voir" &&
                        $(this).children("a").attr("href").match(/^\/ressources-biologiques\/home\/.*$/)
                    ){
                        // Change the text of the link
                        $(this).children("a").text("Annuler la modification");
                    }
                });

                // Call preventLeavingPage function
                preventLeavingPage();
            }

            /* Custom page title for /node/add/rb-collections */
            if( window.location.pathname.match(/^\/node\/[0-9]{0,10}\/delete$/) ) {

                $(".page-title-wrap").remove();

                $("#node-delete-confirm").css("margin", "50px auto");
            }


            if(window.location.pathname === "/utilisateur/ress_bio/etablissement"){

                // Call preventLeavingPage function
                preventLeavingPage();
            }

            // Prevent user leaving page
            function preventLeavingPage(){

                // Initialize boolean
                var isSubmitBtnClicked = false;

                // If a submit button is clicked
                $("#edit-submit").click(function(){

                    // Set boolean to true
                    isSubmitBtnClicked = true;
                });

                // If a delete button is clicked
                $("#edit-delete").click(function(){

                    // Set boolean to true
                    isSubmitBtnClicked = true;
                });

                // Prevent user leaving page
                $(window).bind('beforeunload', function(){

                    // If boolean is false that's to say user didn't click on submit button
                    if(isSubmitBtnClicked === false) {

                        // Send alert
                        return 'Les modifications faites ne seront pas enregistrées.';
                    }
                });

            }

            /* ----------------------------------------------------------------------------------- */
            /* ------------------------- Click : Other than "Aucun" value ------------------------ */
            /* ----------------------------------------------------------------------------------- */

            /* Collecte des données associées aux échantillons */
            $(".field-name-field-collecte-donnees .form-checkbox").click(function(){

                if(
                    $(this).is( ":checked" ) &&
                    $(this).attr("id") !== "edit-field-collecte-donnees-und-4"
                ){
                    var aucunValue = "edit-field-collecte-donnees-und-4";

                    unCheckAucunValue(aucunValue);
                }
            });
            /* Suivi des individus */
            $(".field-name-field-suivi-individus .form-checkbox").click(function(){

                if(
                    $(this).is( ":checked" ) &&
                    $(this).attr("id") !== "edit-field-suivi-individus-und-4"
                ){
                    var aucunValue = "edit-field-suivi-individus-und-4";

                    unCheckAucunValue(aucunValue);
                }
            });
            /* Collecte d'échantillons supplémentaires */
            $(".field-name-field-collecte-echantillons-sup .form-checkbox").click(function(){

                if(
                    $(this).is( ":checked" ) &&
                    $(this).attr("id") !== "edit-field-collecte-echantillons-sup-und-3"
                ){
                    var aucunValue = "edit-field-collecte-echantillons-sup-und-3";

                    unCheckAucunValue(aucunValue);
                }
            });
            /* Collecte de données supplémentaires */
            $(".field-name-field-collecte-donnees-sup .form-checkbox").click(function(){

                if(
                    $(this).is( ":checked" ) &&
                    $(this).attr("id") !== "edit-field-collecte-donnees-sup-und-3"
                ){
                    var aucunValue = "edit-field-collecte-donnees-sup-und-3";

                    unCheckAucunValue(aucunValue);
                }
            });

            /* Reinit "Aucun" value when user choice is different than Aucun value */
            function unCheckAucunValue(aucunValue){

                // Uncheck "Aucun" value
                $("#"+aucunValue).prop('checked', false);
            }

            /* ----------------------------------------------------------------------------------- */
            /* -------------------------------- Click : "Aucun" value ---------------------------- */
            /* ----------------------------------------------------------------------------------- */

            /* Collecte des données associées aux échantillons */
            $(".field-name-field-collecte-donnees #edit-field-collecte-donnees-und-4").click(function(){

               if( $(this).is( ":checked" ) ){

                   var arrayValue = [
                       "edit-field-collecte-donnees-und-0",
                       "edit-field-collecte-donnees-und-1",
                       "edit-field-collecte-donnees-und-2",
                       "edit-field-collecte-donnees-und-3"
                   ];

                   uncheckWhenAucun(arrayValue);
               }
            });
            /* Suivi des individus */
            $(".field-name-field-suivi-individus #edit-field-suivi-individus-und-4").click(function(){

               if( $(this).is( ":checked" ) ){

                   var arrayValue = [
                       "edit-field-suivi-individus-und-0",
                       "edit-field-suivi-individus-und-1",
                       "edit-field-suivi-individus-und-2",
                       "edit-field-suivi-individus-und-3"
                   ];

                   uncheckWhenAucun(arrayValue);
               }
            });
            /* Collecte d'échantillons supplémentaires */
            $(".field-name-field-collecte-echantillons-sup #edit-field-collecte-echantillons-sup-und-3").click(function(){

               if( $(this).is( ":checked" ) ){

                   var arrayValue = [
                       "edit-field-collecte-echantillons-sup-und-0",
                       "edit-field-collecte-echantillons-sup-und-1",
                       "edit-field-collecte-echantillons-sup-und-2"
                   ];

                   uncheckWhenAucun(arrayValue);
               }
            });
            /* Collecte de données supplémentaires */
            $(".field-name-field-collecte-donnees-sup #edit-field-collecte-donnees-sup-und-3").click(function(){

               if( $(this).is( ":checked" ) ){

                   var arrayValue = [
                       "edit-field-collecte-donnees-sup-und-0",
                       "edit-field-collecte-donnees-sup-und-1",
                       "edit-field-collecte-donnees-sup-und-2"
                   ];

                   uncheckWhenAucun(arrayValue);
               }
            });

            /* Reinit user choice when he clicks on Aucun value */
            function uncheckWhenAucun(arrayValue){

                for(var i = 0 ; i < arrayValue.length ; i++){

                    // Uncheck other value than "Aucun"
                    $("#"+arrayValue[i]).prop('checked', false);
                }

            }
        }
    };
}(jQuery));
