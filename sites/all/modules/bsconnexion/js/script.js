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
                window.location.href='signup';
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

            // Captcha response container
            $("fieldset.captcha>div>div.form-item-captcha-response").css('margin', '0');
            $("fieldset.captcha>div>div.form-item-captcha-response").css('margin-top', '20px');

            // Captcha label solution
            $("fieldset.captcha>div>div>label").css('margin-bottom', '8px');

            // Captcha input solution
            $("fieldset.captcha>div>div>input").css('width', '120px');
            $("fieldset.captcha>div>div>input").css('border', '2px solid #1e6a8e');
            $("fieldset.captcha>div>div>input").css('border-radius', '4px');

            // Captcha description of the use
            $("fieldset.captcha>div>div>div.description").text("Trouvez la solution.");
            $("fieldset.captcha>div>div>div.description").css('margin-top', '15px');

            // Remove the Captcha global description
            $("fieldset.captcha>div>div.description").remove();
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
                || (window.location.pathname == "/utilisateur/catalogueg")
                || (window.location.pathname == "/utilisateur/cataloguep")
                || (window.location.pathname == "/utilisateur/factures")
                || (window.location.pathname == "/utilisateur/commandes")
                || (window.location.pathname == "/utilisateur/abonnements")
                || (window.location.pathname == "/utilisateur/profil/")
                || (window.location.pathname == "/utilisateur/catalogueg/")
                || (window.location.pathname == "/utilisateur/cataloguep/")
                || (window.location.pathname == "/utilisateur/factures/")
                || (window.location.pathname == "/utilisateur/commandes/")
                || (window.location.pathname == "/utilisateur/abonnements/")
            ){
                $("#main-content-wrapper").css("margin-left", -$("#main-content-wrapper").offset().left);
                $("#main-content-wrapper").css("width", $(window).width());
                $("#main-content-wrapper>div>div").css("padding", "0");
                $("#main-wrapper .container-inner").css("margin-top", "17px");
            }

        }
    };
}(jQuery));