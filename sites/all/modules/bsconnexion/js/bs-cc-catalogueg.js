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

            function addURL(itemSelected) {
                window.location.replace(window.location.origin + "/utilisateur/catalogueg/" + itemSelected);
            }

        /* Start - Pass URL's parameters depending of the tid of the element selected */

            $(".bs-cg-element-container").click(function(){
                var elementId = $(this).children(".bs-cg-element-id").text();

                addURL(elementId);
            });

        /* End - Pass URL's parameters depending of the tid of the element selected */

        /* Start - Redirect to the parent selected */

            $(".bs-cg-parent-element-container").click(function(){
                var parentSelected = $(this).children(".bs-cg-element-id").text();

                addURL(parentSelected);
            });

        /* End - Pass URL's parameters depending of the tid of the element selected */

        /* Start - Redirect to the first level of the catalogue */

            $('#bs-cg-parent-top').click(function(){
                window.location.replace(window.location.origin + "/utilisateur/catalogueg");
            });

        /* End - Redirect to the first level of the catalogue */

    /* End - Set an URL parameter depending of the element clicked */


        /* Start - When the user is on a leaf (last child of a hierarchy) */

            /* Add to the DOM the leaf form container */
            if(!($("#bs-cc-cg-leaf-cancel").is(":visible"))){
                $(".node-catalogue-general-feuilles > div").prepend(
                    "<button id='bs-cc-cg-leaf-cancel'><i class='fa fa-times' aria-hidden='true'></i></button>"
                    + "<p id='bs-cc-cg-leaf-title'></p>"
                );
            }

            if(!($("#bs-cc-cg-leaf-instructions").is(":visible"))){
                $(".node-catalogue-general-feuilles > div > form").prepend(
                    "<p id='bs-cc-cg-leaf-instructions'>Merci de remplir un maximum de champs afin que nous vous proposions le produit le plus adapté.</p>"
                );
            }

            /* If user click on cancel button, hide the leaf form container */
            $("#bs-cc-cg-leaf-cancel").click(function(){
                $(this).parent().parent().hide();
                // $("body").css("overflow-y", "scroll");
            });

            /* Set the name of the leaf into the leaf form container */
            $("#bs-cc-cg-leaf-title").text($(".bs-cg-element-active").text());



            /* Allow or not the body scrolling */
            // if($("#leaf-true").text() == "leaf"){
            //     $("body").css("overflow-y", "hidden");
            // }else{
            //     $("body").css("overflow-y", "scroll");
            // }

        /* End - When the user is on a leaf (last child of a hierarchy) */

        /* Start - Webform 'feuille', textfield "Autre(s) ..." */

            /*
              Click on a select field & click on
              "autre" or "autres" or "Autre" or "Autres" value
              Display the textfield "Autre(s) ..." otherwise no
            */
            $(".webform-component-select > select").click(function(){

                // Retrieve the label text
                var labelText = $(this).parent().children("label").text();

                // Remove the ' *' for obligatories labels
                labelText = labelText.split(" *")[0];

                // Remove accent
                labelText = labelText.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                // Set to lower case
                labelText = labelText.normalize('NFD').toLowerCase();

                // Stock in an array the allowed values
                var tabTest = ["autre", "autres", "Autre", "Autres"];

                // If the value selected is : "autre" or "autres" or "Autre" or "Autres"
                if(
                    $(this).val() == "autre" ||
                    $(this).val() == "autres" ||
                    $(this).val() == "Autre" ||
                    $(this).val() == "Autres"
                ){

                    // Display the "Autre(s) ..." textfield
                    for(var i=0; i<tabTest.length ; i++){
                        $("#webform-component-" + tabTest[i] + "-" + labelText).css("display", "block");
                    }

                }else{

                    // Hide the "Autre(s) ..." textfield
                    for(var i=0; i<tabTest.length ; i++) {
                        $("#webform-component-" + tabTest[i] + "-" + labelText.toLowerCase()).css("display", "none");
                    }
                }
            });

            // Change appearance of the textfield with the label "Autre(s) ..."
            $(".webform-component-textfield").each(function(){
                // For each textfield with the following id
                if(
                    $(this).attr("id").split("webform-component-autre")[0] == "" ||
                    $(this).attr("id").split("webform-component-autres")[0] == ""
                ){
                    // retrieve the id
                    var thisId = $(this).attr("id")

                    // Change the appearance of the "Autre(s) ..." textfield
                    $("#" + thisId).css({
                        "display" : "none"
                    });
                }
            });

        /* End - Webform 'feuille', textfield "Autre(s) ..." */

            // $(".webform-component-managed_file").parent().parent().css("width", "100%");
            // $(".webform-component-managed_file").parent("#edit-submitted-image-ajax-wrapper").css("width", "100%");

        }
    };
}(jQuery));