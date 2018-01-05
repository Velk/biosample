(function ($) {
    Drupal.behaviors.bs_cc_profil_changeable_datas = {
        attach: function (context, settings) {

/*/////////////////////////////////////////////////////////////////////////////////////////////////*/
/*////////////////////////////////// CHANGEABLE DATAS /////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////*/

            var fieldDisabled = true;

            $("#bs-cc-update-account-civilite").prop( "disabled", true );
            $("#bs-cc-update-account-nomprenom").prop( "disabled", true );
            $("#bs-cc-update-account-posteservice").prop( "disabled", true );
            $("#bs-cc-update-account-mailcontact").prop( "disabled", true );
            $("#bs-cc-update-account-telephone").prop( "disabled", true );
            $("#bs-cc-update-account-fax").prop( "disabled", true );

            $("#bs-cc-update-account-civilite-div").append('<div class="bs-cc-update-account-update-btn"><i class="fa fa-pencil" aria-hidden="true"></i></div>');
            $("#bs-cc-update-account-nomprenom-div").append('<div class="bs-cc-update-account-update-btn"><i class="fa fa-pencil" aria-hidden="true"></i></div>');
            $("#bs-cc-update-account-posteservice-div").append('<div class="bs-cc-update-account-update-btn"><i class="fa fa-pencil" aria-hidden="true"></i></div>');
            $("#bs-cc-update-account-mailcontact-div").append('<div class="bs-cc-update-account-update-btn"><i class="fa fa-pencil" aria-hidden="true"></i></div>');
            $("#bs-cc-update-account-telephone-div").append('<div class="bs-cc-update-account-update-btn"><i class="fa fa-pencil" aria-hidden="true"></i></div>');
            $("#bs-cc-update-account-fax-div").append('<div class="bs-cc-update-account-update-btn"><i class="fa fa-pencil" aria-hidden="true"></i></div>');

            $(".bs-cc-update-account-update-btn").click(function(){
                if(fieldDisabled){
                    $(this).parent().children().children().prop( "disabled", false );
                    fieldDisabled = false;
                }else{
                    $(this).parent().children().children().prop( "disabled", true );
                    fieldDisabled = true;
                }
            });

            /* Start - Display or not the button submit when the user changes a value */
            var saveCivilite = $("#bs-cc-update-account-civilite").val();
            var saveNomPrenom = $("#bs-cc-update-account-nomprenom").val();
            var savePosteService = $("#bs-cc-update-account-posteservice").val();
            var saveMailContact = $("#bs-cc-update-account-mailcontact").val();
            var saveTelephone = $("#bs-cc-update-account-telephone").val();
            var saveFax = $("#bs-cc-update-account-fax").val();

            function checkValuesChanged() {
                if ($("#bs-cc-update-account-civilite").val() != saveCivilite
                    || $("#bs-cc-update-account-nomprenom").val() != saveNomPrenom
                    || $("#bs-cc-update-account-posteservice").val() != savePosteService
                    || $("#bs-cc-update-account-mailcontact").val() != saveMailContact
                    || $("#bs-cc-update-account-telephone").val() != saveTelephone
                    || $("#bs-cc-update-account-fax").val() != saveFax) {
                    $("#bs-cc-update-account-submit").fadeIn();
                } else {
                    $("#bs-cc-update-account-submit").fadeOut();
                }
            }

            // ...repeat it once every second
            window.setInterval(checkValuesChanged, 1000);
            /* End - Display or not the button submit when the user changes a value */

/*/////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////////////////// UNCHANGEABLE DATAS /////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////*/

            $("#block-bsconnexion-user-profil-unchangeable-datas").height($("#block-bsconnexion-user-profil-changeable-datas").height())

        }
    };
}(jQuery));