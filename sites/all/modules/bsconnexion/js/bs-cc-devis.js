(function ($) {
    Drupal.behaviors.bs_cc_devis = {
        attach: function (context, settings) {

            // $("#sidebar-second-wrapper").css("height", "0");
            $(".container > #page-title").text("Demande de devis");
            $(".container > #page-title").css("text-transform", "none");

            // If there is quote requests
            if($("#bs-cc-quote-request-container .bs-cc-quote-request").is(":visible")){
                $("#bs-cc-qr-button").click(function(){
                    // $( ".bs-cc-quote-request" ).each(function() {
                    //     console.log("NID : " + $(this).children(".bs-cc-qr-nid").text());
                    //     console.log("SID : " + $(this).children(".bs-cc-qr-sid").text());
                    // });
                    window.location.search = "?send=true";
                });
            }else{
            //If there isn't quote requests, hide the button
                $("#bs-cc-qr-button").hide();

                $("#bs-cc-quote-request-container").append("<p id='bs-cc-noquote-request-message'>Veuillez demander des devis à l'aide du <a href='/utilisateur/catalogueg'>Catalogue Général.</a></p>")
                $("#bs-cc-noquote-request-message").css({
                    "text-align": "center",
                    "color": "#fff",
                    "width": "85%",
                    "margin-right": "auto",
                    "margin-left": "auto"
                });
            }

            if(!($("#bs-cc-quote-container .bs-cc-quote-request").is(":visible"))){
                $("#bs-cc-quote-container").append("<p id='bs-cc-noquote-message'>Vous n'avez effectué aucune demande de devis.</p>")
                $("#bs-cc-noquote-message").css({
                    "text-align": "center",
                    "color": "#424242",
                    "width": "85%",
                    "margin-right": "auto",
                    "margin-left": "auto"
                });
            }

        /* Start - Existing provider fields */

            // If "Oui" is checked, show fields otherwise hide them
            if($(".webform-submission > form.webform-client-form .form-item > label:contains('Les caractéristiques techniques sont-elles disponibles chez un autre fournisseur')").parent().children("div").children("div").children("label:contains('Oui')").parent().children("input").is(":checked")){

                showExistingProviderFields("block");
            }else{

                showExistingProviderFields("none");
            }

            // Custom the field containing the label with the text :
            // 'Lien web vers la page du produit'
            $(".webform-submission > form.webform-client-form .form-item > label:contains('Lien web vers la page du produit')").parent().css({
                "float":"none",
                "clear":"both",
                "width" : "100%"
            });
            $(".webform-submission > form.webform-client-form .form-type-radio").each(function(){

                $(this).append("<span class='checkmark'></span>");
            });
            // Retrieve the div containing the label :
            // "Les caractéristiques techniques sont-elles disponibles chez un autre fournisseur"
            $(".webform-submission > form.webform-client-form .form-item > label:contains('Les caractéristiques techniques sont-elles disponibles chez un autre fournisseur')").parent().each(function(){

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
                    ".webform-submission > form.webform-client-form .form-item > label:contains('Nom du fournisseur')," +
                    ".webform-submission > form.webform-client-form .form-item > label:contains('Référence du produit')," +
                    ".webform-submission > form.webform-client-form .form-item > label:contains('Lien web vers la page du produit')"
                ).parent().css({
                    "display" : displayValue
                });
            };

        /* End - Existing provider fields */

        }
    };
}(jQuery));