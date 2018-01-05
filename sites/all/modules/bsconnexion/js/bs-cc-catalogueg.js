(function ($) {
    Drupal.behaviors.bs_cc_catalogueg = {
        attach: function (context, settings) {

        /* Start - Code pour la view */

            $(".bs-cg-element-container").mouseenter(function(){
                $(this).children(".bs-cg-cover").hide();
                $(this).children(".bs-cg-element-name").css("color", "#1e6a8e");
                $(this).children(".bs-cg-element-name").css("background-color", "rgba(255,255,255,.75)");
            });

            $(".bs-cg-element-container").mouseleave(function(){
                $(this).children(".bs-cg-cover").show();
                $(this).children(".bs-cg-element-name").css("color", "#fff");
                $(this).children(".bs-cg-element-name").css("background-color", "transparent");
            });

        /* End - Code pour la view */

    /* Start - Set an URL parameter depending of the element clicked */

            function addQSParam(name, value) {
                var re = new RegExp("([?&]" + name + "=)[^&]+", "");

                function add(sep) {
                    window.location.href += sep + name + "=" + encodeURIComponent(value);
                }

                function change() {
                    window.location.href = window.location.href.replace(re, "$1" + encodeURIComponent(value));
                }
                if (window.location.href.indexOf("?") === -1) {
                    add("?");
                } else {
                    if (re.test(window.location.href)) {
                        change();
                    } else {
                        add("&");
                    }
                }
            }

        /* Start - Pass URL's parameters depending of the tid of the element selected */

            $(".bs-cg-element-container").click(function(){
                var itemSelected = $(this).children(".bs-cg-element-id").text();
                addQSParam("val", itemSelected);
            });

        /* End - Pass URL's parameters depending of the tid of the element selected */

        /* Start - Redirect to the parent selected */

            $(".bs-cg-parent-element-container").click(function(){
                var parentSelected = $(this).children(".bs-cg-element-id").text();

                addQSParam("val", parentSelected);
            });

        /* End - Pass URL's parameters depending of the tid of the element selected */

        /* Start - Redirect to the first level of the catalogue */

            $('#bs-cg-parent-top').click(function(){
                window.location.replace(window.location.origin + window.location.pathname);
            });

        /* End - Redirect to the first level of the catalogue */


    /* End - Set an URL parameter depending of the element clicked */

        }
    };
}(jQuery));