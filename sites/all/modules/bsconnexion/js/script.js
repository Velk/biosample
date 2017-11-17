(function ($) {
    Drupal.behaviors.bsconnexion = {
        attach: function (context, settings) {
            // Code to be run on page load, and
            // on ajax load added here
            console.log("test");
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

        }
    };
}(jQuery));