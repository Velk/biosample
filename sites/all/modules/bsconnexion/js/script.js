(function ($) {
    Drupal.behaviors.bsconnexion = {
        attach: function (context, settings) {
            // Code to be run on page load, and
            // on ajax load added here

        /* Start - Gael | Modify the "S'enregister" input on the headband */
            // Change the type=submit to a type=button
            $('#bs-cc-headband-buttons-signup').attr('type', 'button');
            // Remove the class="form-submit
            $('#bs-cc-headband-buttons-signup').removeClass("form-submit");
            // Set the value to uppercase
            $('#bs-cc-headband-buttons-signup').val (function () {
                return this.value.toUpperCase();
            });
            // Return to the /signup page when button is clicked
            $('#bs-cc-headband-buttons-signup').click(function(){
                window.location.href='/signup';
            });
        /* End - Gael | Modify the "S'enregister" input on the headband */

        /* Start - Gael | Modify the "Annuler" input in the /signup page */
            // Change the type=submit to a type=button
            $('#bs-cc-signup-button-cancel').attr('type', 'button');
            // Remove the class="form-submit
            $('#bs-cc-signup-button-cancel').removeClass("form-submit");
            // Set the value to uppercase
            $('#bs-cc-signup-button-cancel').val (function () {
                return this.value.toUpperCase();
            });
            // Return to the / (home) page when button is clicked
            $('#bs-cc-signup-button-cancel').click(function(){
                window.location.href='/';
            });
        /* End - Gael | Modify the "Annuler" input in the /signup page */

        /* Start - Gael | Custom captcha style */
            // Captcha container
            $("fieldset.captcha").css('border', 'none');
            $("fieldset.captcha").css('margin', '40px 0');
            $("fieldset.captcha").css('padding', '0');
            $("fieldset.captcha").css('border-top', '1px solid #424242');

            // Captcha legend
            $("fieldset.captcha>legend").css('font-size', '20px');
            $("fieldset.captcha>legend").css('margin-left', '10px');
            $("fieldset.captcha>legend").css('padding-left', '10px');

            // Captcha response container
            $("fieldset.captcha>div>div.form-item-captcha-response").css('margin', '0');
            $("fieldset.captcha>div>div.form-item-captcha-response").css('margin-top', '20px');

            // Captcha label solution
            $("fieldset.captcha>div>div>label").css('margin-bottom', '8px');
            $("fieldset.captcha>div>div>label").css('font-size', '14px');

            // Captcha input solution
            $("fieldset.captcha>div>div>input").css('width', '120px');
            $("fieldset.captcha>div>div>input").css('border', 'none');
            $("fieldset.captcha>div>div>input").css('border-bottom', '1px solid #b0c8d4');

            // Captcha description of the use
            $("fieldset.captcha>div>div>div.description").text("Trouvez la solution.");
            $("fieldset.captcha>div>div>div.description").css('margin-top', '10px');
            $("fieldset.captcha>div>div>div.description").css('font-size', '14px');

            // Remove the Captcha global description
            $("fieldset.captcha>div>div.description").remove();


            $("div.gm-style > div:first-of-type > div:first-of-type").css("transform", "translate(25vw, 0px) !important");
            $("div.gm-style > div:first-of-type > div:nth-child(3) > div:last-of-type").css("transform", "translate(250px, 0px) !important");

            /*div.gm-style > div:first-of-type > div:first-of-type,*/
            /*div.gm-style > div:first-of-type > div:nth-child(3) > div:last-of-type {*/
            /*transform: translate(25vw, 0px) !important;*/
            /*}*/
        /* End - Gael | Custom captcha style */

        /* Start - Gael | Actualize the username field with the value of the mail field */
            $('#user-register-form').mousemove(function(){
                $('#bs-cc-register-form-name').val($('#bs-cc-register-form-mail').val());
            });
            $('#bs-cc-register-form-cgu').click(function(){
                $('#bs-cc-register-form-name').val($('#bs-cc-register-form-mail').val());
            });
            $('#bs-cc-register-form-cgv').click(function(){
                $('#bs-cc-register-form-name').val($('#bs-cc-register-form-mail').val());
            });
        /* End - Gael | Actualize the username field with the value of the mail field */


            if(
                (window.location.pathname == "/utilisateur/profil")
                // || (window.location.pathname == "/utilisateur/catalogueg")
                || (window.location.pathname == "/utilisateur/cataloguep")
                || (window.location.pathname == "/utilisateur/factures")
                || (window.location.pathname == "/utilisateur/commandes")
                || (window.location.pathname == "/utilisateur/historique")
                || (window.location.pathname == "/utilisateur/abonnements")
                || (window.location.pathname == "/utilisateur/devis")
                || (window.location.pathname == "/utilisateur/profil/")
                // || (window.location.pathname == "/utilisateur/catalogueg/")
                || (window.location.pathname == "/utilisateur/cataloguep/")
                || (window.location.pathname == "/utilisateur/factures/")
                || (window.location.pathname == "/utilisateur/commandes/")
                || (window.location.pathname == "/utilisateur/historique/")
                || (window.location.pathname == "/utilisateur/abonnements/")
                || (window.location.pathname == "/utilisateur/devis/")
            ){
                $("#main-content-wrapper").css("margin-left", -$("#main-content-wrapper").offset().left);
                $("#main-content-wrapper").css("width", $(window).width());
                $("#main-content-wrapper>div>div").css("padding", "0");
                // $("#main-wrapper .container-inner").css("margin-top", "17px");
            }


        /* Start - Set the content at the entire window width */
            if(
                (window.location.pathname == "/utilisateur/catalogueg") ||
                (window.location.pathname == "/utilisateur/catalogueg/") ||
                (window.location.pathname.match(/^\/utilisateur\/catalogueg\/[0-9]{0,10}$/))
            ){
                $(".page-title-wrap").remove();

                $("#main-content-wrapper").css("margin-left", -$("#main-content-wrapper").offset().left);
                $("#main-content-wrapper").css("width", $(window).width());
                $("#main-content-wrapper>div>div").css("padding", "0");
                // $("#main-wrapper .container-inner").css("margin-top", "17px");
            }
        /* End - Set the content at the entire window width */

        /* Start - Set the content of submissions at the entire window width */
            if(
                (window.location.pathname.match(/^\/node\/[0-9]{0,5}\/submission\/[0-9]{0,10}$/)) ||
                (window.location.pathname.match(/^\/node\/[0-9]{0,5}\/submission\/[0-9]{0,10}\/edit$/)) ||
                (window.location.pathname.match(/^\/node\/[0-9]{0,5}\/submission\/[0-9]{0,10}\/delete$/))
            ){
                $(".page-title-wrap > .container").css("padding", "0");
                $(".page-title-wrap > .container > h1").css("text-transform", "Capitalize");

                $("#main-content-wrapper").css("margin-left", -$("#main-content-wrapper").offset().left);
                $("#main-content-wrapper").css("width", $(window).width());
                $("#main-content-wrapper>div>div").css("padding", "0");
                $("#main-wrapper .container").css("padding", "0");
                $("#main-wrapper .container-inner").css("margin-top", "0");
            }
        /* End - Set the content of submissions at the entire window width */

            /* Start - Custom the user/ page and remove useless form */
            // If the page is /user/uid/edit and
            // if the page doesn't contain the word admin
            if(window.location.pathname.match(/^\/user\/[0-9]{0,10}\/edit$/) && window.location.href.match(/^((?!admin).)*$/)){
                // console.log("regexp");
                $("#page-title").text("Réinitialisation du mot de passe.");
                $("#page-title").css({
                    "font-size" : "30px",
                    "min-height" : "0px",
                    "height" : "auto"
                });

                $("fieldset#edit-locale, fieldset#edit-contact, fieldset#edit-timezone, div.tabs, #edit-account > .form-item-mail").css({
                    "display" : "none"
                });

                $("div#edit-account input").css({
                    "border": "2px solid #1e6a8e",
                    "border-radius": "4px",
                    "width" : "250px",
                    "margin-top" : "5px",
                    "padding" : "5px 15px"
                });

                $("#edit-locale").remove();
                $("#edit-contact").remove();
                $("#edit-contact").remove();
                $("#edit-timezone").remove();
                $("div.tabs").remove();
                $("#edit-account > .form-item-mail").remove();
            }


            if(window.location.pathname.match(/^\/user\/.*$/) && window.location.href.match(/^((?!admin).)*$/)){
                $("div#edit-actions input").css({
                    "text-shadow" : "none",
                    "box-shadow" : "none",
                    "width" : "auto",
                    "height" : "40px",
                    "background" : "#1e6a8e",
                    "background-color" : "#1e6a8e",
                    "box-sizing" : "border-box",
                    "border" : "none",
                    "border-radius" : "4px",
                    "color" : "#fff",
                    "padding" : "0 15px",
                    "margin" : "0"
                });

                $("div#edit-actions input").mouseenter(function(){
                    $(this).css("background-color", "#424242");
                });

                $("div#edit-actions input").mouseleave(function(){
                    $(this).css("background-color", "#1e6a8e");
                });
            }

        /* End - Custom the user/ page and remove useless form */

        /* Start - Check if user has entered wrong informations */

            if($("#bs-cc-headband-field-username").is(":visible") && $("#bs-cc-headband-field-password").is(":visible")){

                var stringIsError = $("#bs-cc-headband-field-username").prop("class");
                var splitString = stringIsError.split(' ');

                for(i = 0 ; i < splitString.length ; i++){
                    if(splitString[i] == "error"){
                        console.log("La classe Error est bien présente.")
                        $("#bs-cc-headband-field-username").parent().parent().parent().prepend(
                            "<i class='fa fa-times' aria-hidden='true' id='wrong-authentication-cross'></i>" +
                            "<p id='wrong-authentication'>Le nom d'utilisateur ou le mot de passe est invalide.</p>"
                        );
                    }
                }

                $("#wrong-authentication-cross").click(function(){
                   $(this).remove();
                   $("#wrong-authentication").remove();
                });

            }

        /* End - Check if user has entered wrong informations */

        /* Start - Set a cancel to hide drupal messages */
            if($("div.status").is(":visible")){
                $("div.status").append(
                    "<i class='fa fa-times' aria-hidden='true'>"
                );
            }
            removeDrupalMessage();
        /* End - Set a cancel to hide drupal messages */

        // if(
        //     window.location.pathname.match(/^\/user\/[0-9]*\/edit$/) &&
        //     window.location.search.match(/^\?pass-reset-token=[A-z0-9_]*$/)
        // ){
        //     console.log("YAYAY");
        //     $("#edit-actions input#edit-submit").click(function(){
        //        window.location.pathname = "/utilisateur/profil";
        //     });
        // }

            if(window.location.pathname == "/contactez-nous"){
                $("#main-wrapper > .container").css("padding", "0");
            }

            if(window.location.pathname.match(/^\/user\/reset\/[0-9]{0,5}\/[0-9]{10}\/.*$/)){
                $("form#user-pass-reset > div > p").hide();
                $("form#user-pass-reset #edit-actions").css("text-align","center");
                $("body").append("<div id='loader-container'><div id='loader'></div></div>");
                $("body").css("overflow", "hidden");
                $("#edit-actions #edit-submit").click();
            }
            if(
                window.location.pathname.match(/^\/user\/[0-9]{0,5}\/edit$/) &&
                window.location.search.match(/^\?pass-reset-token.*$/)
            ){
                $("#page-title").text("INITIALISATION DU MOT DE PASSE.");
            }

            function removeDrupalMessage(){
                $("div.status i").click(function(){
                    $(this).parent().remove();
                });
            }

            /*
             * If the page is /signup
             */
            if( window.location.pathname.match(/^\/signup$/) ) {

                // Smooth auto scroll directly to the signup form
                window.scroll({
                    top: 140,
                    left: 0,
                    behavior: 'smooth'
                });

                // Custom Captcha when error occured
                if($("#edit-captcha-response").hasClass( "error" )){

                    // Change color of the captcha
                    $("#edit-captcha-response").parent().children("span").css("color", "#f9a0a0");
                }
            }

        }
    };
}(jQuery));