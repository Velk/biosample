(function ($) {
    Drupal.behaviors.bs_rsb_admin_manager = {
        attach: function (context, settings) {
            // Code to be run on page load, and
            // on ajax load added here

            /* Start - Click on a button to enabled the delete user button */
            $("#bs-cc-admin-delete-establishment").prop( "disabled", true );
            $("#bs-cc-admin-delete-establishment").addClass( "form-button-disabled" );

            $("#bs-cc-admin-delete-establishment").parent().append(
                "<div id='bs-cc-admin-delete-establishment-confirm'>" +
                "<i class='fa fa-times fa-2x' aria-hidden='true'></i>" +
                "</div>" +
                "<p id='bs-cc-admin-delete-establishment-disclaimer'>Appuyez sur la croix ci-dessus pour activer le bouton de suppression du compte.</p>"
            );

            $("#bs-cc-admin-delete-establishment-confirm").click(function(){
                var deleteConfirm = confirm(
                    "Attention, la suppression d'un compte est irréversible.\n\n" +
                    "En choississant de continuer, le bouton de suppression sera activé " +
                    "et vous pourrez alors supprimer ce compte."
                );

                if(deleteConfirm){
                    $("#bs-cc-admin-delete-establishment").prop("disabled", false);
                    $("#bs-cc-admin-delete-establishment").removeClass( "form-button-disabled" );
                }else{
                    $("#bs-cc-admin-delete-establishment").prop("disabled", true);
                    $("#bs-cc-admin-delete-establishment").addClass( "form-button-disabled" );
                }
            });
            /* End - Click on a button to enabled the delete user button */

        }
    };
}(jQuery));