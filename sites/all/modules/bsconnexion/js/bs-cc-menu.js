(function ($) {
    Drupal.behaviors.bs_cc_menu = {
        attach: function (context, settings) {

            /* Start - Gael | Set the menu on the entire width when the user is connected */
            // When the profil's nav menu is visible
            if($("#bs-cc-user-connected-menu").is(":visible")){
                // Set the width of the profil's nav menu on the entire window width
                $(document).ready(function(){
                    var offsetLeftConnectedMenu = $("#bs-cc-user-connected-menu").offset().left;
                    var offsetTopConnectedMenu = $("#bs-cc-user-connected-menu").offset().top;
                    var offsetTopMainWrapper = $("#main-wrapper").offset().top;
                    var distanceMenu = -offsetTopConnectedMenu + offsetTopMainWrapper;

                    $("#bs-cc-user-connected-menu").css("margin-left", -offsetLeftConnectedMenu);
                    $("#bs-cc-user-connected-menu").css("height", "auto");
                    $("#bs-cc-user-connected-menu").css("position", "relative");
                    $("#bs-cc-user-connected-menu").css("top", distanceMenu);
                    $("#bs-cc-user-connected-menu").width($(window).width());
                });

                // Set the profil's nav menu below the main nav menu
                // var offsetMenuTop = $("#header-wrapper").offset().top;
                // var menuHeight = $("#header-wrapper").height();
                // var offsetMenuUserConnectedTop = $("#bs-cc-user-connected-menu").offset().top;
                // $("#bs-cc-user-connected-menu").css("top", -(offsetMenuUserConnectedTop - (offsetMenuTop+menuHeight)));

                // When click on the historique tab, display the historique submenu
                $("#bs-cc-historique-li").click(function(){
                    $("#bs-cc-dropdown-historique").toggle();
                });
                $("#bs-cc-historique-li").mouseleave(function(){
                    $("#bs-cc-dropdown-historique").hide();
                });

                // Place and design the submenu
                $("#bs-cc-dropdown-historique").css("position", "absolute");
                $("#bs-cc-dropdown-historique").css("background-color", "#e9e9e9");
                var liHistoriqueHeight = $("#bs-cc-historique-li").height();
                $("#bs-cc-dropdown-historique").css("top", liHistoriqueHeight);
                $("#bs-cc-dropdown-historique").css("width", "100%");
            }

            /* End - Gael | Set the menu on the entire width when the user is connected*/

            /* Start - Change li>a's active class in the user connected menu */
            $("#bs-cc-user-connected-menu a").each(function() {
                if(window.location.href == this.href){
                    $(this).css("background-color", "#093e56");
                }
            });
            /* End - Change li>a's active class in the user connected menu */

            /* Start - If page is /utilisateur/profil , remove the headband containing the title */
            if((window.location.pathname == "/utilisateur/profil")
                || (window.location.pathname == "/utilisateur/catalogueg")
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