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

                $("#bs-cc-quote-request-container").append("<p id='bs-cc-noquote-request-message'>Veuillez demander des devis à l'aide du Catalogue Général.</p>")
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

        }
    };
}(jQuery));