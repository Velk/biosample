(function ($) {
    Drupal.behaviors.bs_cc_menu = {
        attach: function (context, settings) {

            setMenu();

            function windowWidthChanged() {
                if($("#block-bsconnexion-user-client-account-menu").width() != $(window).width()) {
                    setMenu();
                }
            }

            // ...repeat it once every second
            window.setInterval(windowWidthChanged, 00);

            /* Start - Gael | Set the menu on the entire width when the user is connected */

            function setMenu(){
                // When the profil's nav menu is visible
                if($("#block-bsconnexion-user-client-account-menu").is(":visible")){
                    $("#block-bsconnexion-user-client-account-menu").css("left", "0");
                    $("#block-bsconnexion-user-client-account-menu").width($(window).width());
                    $("#block-bsconnexion-user-client-account-menu").css(
                        "top", $("#header-wrapper").offset().top + $("#header-wrapper").height()
                    );
                }
            }
            // Wait to retrieve correctly the height of the header-wrapper
            setTimeout(setMenu,200);

            // When click on the historique tab, display the historique submenu
            // $("#bs-cc-historique-li").click(function () {
            //     $("#bs-cc-dropdown-historique").toggle();
            // });
            // $("#bs-cc-historique-li").mouseleave(function () {
            //     $("#bs-cc-dropdown-historique").hide();
            // });

            // Place and design the submenu
            $("#bs-cc-dropdown-rb").css("position", "absolute");
            $("#bs-cc-dropdown-rb").css("background-color", "#e9e9e9");
            var liHistoriqueHeight = $("#bs-cc-rb-li").height();
            $("#bs-cc-dropdown-rb").css("top", liHistoriqueHeight);
            $("#bs-cc-dropdown-rb").css("width", "100%");

            /* End - Gael | Set the menu on the entire width when the user is connected*/

            /* Start - Change li>a's active class in the user connected menu */
            $("#bs-cc-user-connected-menu a").each(function() {
                if(window.location.href == this.href){
                    $(this).css("background-color", "#093e56");
                }
                if(window.location.pathname == "/utilisateur/factures" || window.location.pathname == "/utilisateur/commandes"){
                    $("#bs-cc-historique-li").css("background-color", "#093e56");
                }
                if(window.location.pathname == "/utilisateur/catalogueg"){
                    $("#bs-cc-catalogueG-li").css("background-color", "#093e56");
                }
            });
            /* End - Change li>a's active class in the user connected menu */

            /* Start - If page is /utilisateur/... , remove the headband containing the title */
            if((window.location.pathname == "/utilisateur/profil")
                // || (window.location.pathname == "/utilisateur/catalogueg")
                || (window.location.pathname == "/utilisateur/cataloguep")
                || (window.location.pathname == "/utilisateur/factures")
                || (window.location.pathname == "/utilisateur/commandes")
                || (window.location.pathname == "/utilisateur/abonnements")){
                $(".page-title-wrap").remove();
            }
            /* End - If page is /utilisateur/profil , remove the headband containing the title */

        }
    };
}(jQuery));