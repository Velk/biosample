(function ($) {
    Drupal.behaviors.bs_rsb_collections = {
        attach: function (context, settings) {

            // If btn 'Reinitialiser' is clicked, remove the hash
            $("#bs-rsb-families #all-regne > a").click(function(){

                $("div#block-views-rb-collections-block .views-row").each(function(){

                    // Show the every collection divs
                    $(this).show();
                });

                // Remove class selected for all tabs
                $("#bs-rsb-families > nav > ul > li").each(function(){
                    $(this).removeClass("bs-rsb-family-selected");
                });
            });

            // Array containing the name of every families
            var tabFamilyName = ["#humain", "#animal", "#vegetal", "#microbiologie"];

            // If user click on the family menu
            // Display only collections of this family
            $("#bs-rsb-families > nav > ul > li").click(function(){

                // Change appearance of the tab clicked
                $("#bs-rsb-families > nav > ul > li").removeClass("bs-rsb-family-selected");
                $(this).addClass("bs-rsb-family-selected");

                // Call the function with a delay to prevent the loading of divs
                setTimeout(displayFamilyDiv, 100);
            });

            function displayFamilyDiv(){

                // Browse the array tabFamilyName
                for(var i = 0 ; i < tabFamilyName.length ; i++){

                    // Check the hash name
                    if(window.location.hash == tabFamilyName[i]){

                        // Retrieve the name of the family
                        var textFamilyName = tabFamilyName[i].split("#")[1];

                        $("div#block-views-rb-collections-block .views-row .node-content > .field-name-field-regne").each(function(){

                            if( $(this).parent().parent().parent().is(':visible') ){

                                // If the collection has the name of the hash location (tab clicked)
                                // Show the div / collection or hide it
                                if($(this).children("div.field-items").children("div.field-item").text() == textFamilyName){

                                    $(this).parent().parent().parent().show();
                                }else{

                                    $(this).parent().parent().parent().hide();
                                }
                                $(this).parent().parent().parent().addClass("bs-rsb-family-filter");
                            }

                        });

                        // If there is no collections visible, show every collection of the family
                        if( $(".view-id-rb_collections > .view-content > .views-row").is(':visible') === false){

                            $("div#block-views-rb-collections-block .views-row .node-content > .field-name-field-regne").each(function(){

                                if( $(this).parent().parent().parent().hasClass("bs-rsb-family-filter") ){

                                    // If the collection has the name of the hash location (tab clicked)
                                    // Show the div / collection or hide it
                                    if($(this).children("div.field-items").children("div.field-item").text() == textFamilyName){

                                        $(this).parent().parent().parent().show();
                                    }else{

                                        $(this).parent().parent().parent().hide();
                                    }
                                }

                            });
                        }
                    }
                }
            }

            if(window.location.pathname === "/ressources-biologiques/home"){

                // Call colonRemoval function
                colonRemoval();

                // Call setRegneToCapitalize function
                setRegneToCapitalize();
            }

            /* Remove colon for "RB collections" teaser content type */
            function colonRemoval(){

                // For every field label excepted the one belonging to organism name
                $("#block-views-rb-collections-block .node-rb-collections div:not('.field-name-field-nom-organisme') > h3.field-label").each(function(){

                    // Get text and splice it in order to remove the space and the colon at the end
                    var newText = $(this).text().slice(0,-2);

                    // Display new text
                    $(this).text(newText);
                });
            }

            /* Set to uppercase the first character of Regne (Animal, Microbio, Végétal, Humain) */
            function setRegneToCapitalize(){

                // Set to capitalize
                $("#block-views-rb-collections-block .node-rb-collections div.field-name-field-regne div.field-item").css("text-transform", "capitalize");
            }
        }
    };
}(jQuery));