(function ($) {
    Drupal.behaviors.bs_cc_profil_changeable_datas = {
        attach: function (context, settings) {

            if((window.location.pathname == "/utilisateur/profil")
                || (window.location.pathname == "/utilisateur/catalogueg")
                || (window.location.pathname == "/utilisateur/cataloguep")
                || (window.location.pathname == "/utilisateur/factures")
                || (window.location.pathname == "/utilisateur/commandes")
                || (window.location.pathname == "/utilisateur/abonnements")){
                $("#main-content-wrapper").css("margin-left", -$("#main-content-wrapper").offset().left);
                $("#main-content-wrapper").css("width", $(window).width());
                $("#main-content-wrapper>div>div").css("padding", "0");
            }

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

/*/////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////////////////// UNCHANGEABLE DATAS /////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////*/

            $("#block-bsconnexion-user-profil-unchangeable-datas").height($("#block-bsconnexion-user-profil-changeable-datas").height())

        }
    };
}(jQuery));