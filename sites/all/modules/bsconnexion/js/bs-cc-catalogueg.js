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

            // if(!($("#bs-cc-cg-leaf-instructions").is(":visible"))){
            //     $(".node-catalogue-general-feuilles > div > form").prepend(
            //         "<p id='bs-cc-cg-leaf-instructions'>Merci de remplir un maximum de champs afin que nous vous proposions le produit le plus adapté.</p>"
            //     );
            // }

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
                labelText = labelText.split("*")[0];

                // Remove accent
                labelText = labelText.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                // Set to lower case
                labelText = labelText.normalize('NFD').toLowerCase();

                // Retrieve the selected option of the select field clicked
                var optionSelected = $(this).children("option:selected").text();

                // Concatenate both to create the label of the field to display
                var labelToMatch = optionSelected + " " + labelText;


                // If the optionSelected is 'Autre' or 'Autres'
                if(optionSelected == "Autre" || optionSelected == "Autres"){

                    // Browse fields in the form
                    $(".node-catalogue-general-feuilles .form-item").each(function(){

                        // If the label of a field match with the labelToMatch
                        if($(this).children("label").text().normalize('NFD').replace(/[\u0300-\u036f]/g, "") == labelToMatch){

                            // Show this field
                            $(this).show();
                        }
                    });
                }else{
                // If the optionSelected isn't 'Autre' or 'Autres'

                    // Browse fields in the form
                    $(".node-catalogue-general-feuilles .form-item").each(function(){

                        // If the label of the field match with
                        // 'Autre' + the labeltext or 'Autres' + the labeltext
                        if(
                            $(this).children("label").text().normalize('NFD').replace(/[\u0300-\u036f]/g, "") == ("Autre " + labelText) ||
                            $(this).children("label").text().normalize('NFD').replace(/[\u0300-\u036f]/g, "") == ("Autres " + labelText)
                        ){

                            // Hide this field
                            $(this).hide();
                        }
                    });
                }
            });

            // Change appearance of the textfield with the label "Autre(s) ..."
            $(".node-catalogue-general-feuilles .form-item").each(function(){

                // If the label (étiquette) of the field contains 'Autre', so hide it
                $(this).children("label:contains('Autre')").parent().hide();

            });

        /* End - Webform 'feuille', textfield "Autre(s) ..." */

            // $(".webform-component-managed_file").parent().parent().css("width", "100%");
            // $(".webform-component-managed_file").parent("#edit-submitted-image-ajax-wrapper").css("width", "100%");


        /* Start - Click the legend of a fieldset, simulate a click on the <a> to extend fieldset content */

            $(".node-catalogue-general-feuilles .webform-component-fieldset").each(function(){
                $(this).children("legend").click(function(){
                    $(this).children("span").children("a").click();
                });
            });

        /* End - Click the legend of a fieldset, simulate a click on the <a> to extend fieldset content */

        /* Start - Existing provider fields */

            // Default : Hide fields
            showExistingProviderFields("none");

            // Custom the field containing the label with the text :
            // 'Lien web vers la page du produit'
            $(".node-catalogue-general-feuilles .form-item > label:contains('Lien web vers la page du produit')").parent().css({
                "float":"none",
                "clear":"both",
                "width" : "100%"
            });
            $(".node-catalogue-general-feuilles .form-type-radio").each(function(){

                $(this).append("<span class='checkmark'></span>");
            });
            // Retrieve the div containing the label :
            // "Les caractéristiques techniques sont-elles disponibles chez un autre fournisseur"
            $(".node-catalogue-general-feuilles .form-item > label:contains('Les caractéristiques techniques sont-elles disponibles chez un autre fournisseur')").parent().each(function(){

                // $(this).children("div").children("div").each(function(){
                //    console.log("blablabla");
                // });

                // Browse the div until inputs and when input is clicked
                $(this).children("div").children("div").children("input").click(function(){

                    // Check if the checkbox is checked and the value is "oui"
                    if($(this).is(':checked') && $(this).val() == "oui"){

                        // Show 3 others fields
                        showExistingProviderFields("block");
                    }else{

                        // Hide 3 others fields
                        showExistingProviderFields("none");
                    }
                });
            });

            // Select three fields containing a specific String
            // Hide or Show them depending on the checkbox value
            function showExistingProviderFields(displayValue){
                $(
                    ".node-catalogue-general-feuilles .form-item > label:contains('Nom du fournisseur')," +
                    ".node-catalogue-general-feuilles .form-item > label:contains('Référence du produit')," +
                    ".node-catalogue-general-feuilles .form-item > label:contains('Lien web vers la page du produit')"
                ).parent().css({
                    "display" : displayValue
                });
            };

        /* End - Existing provider fields */

}
};
}(jQuery));