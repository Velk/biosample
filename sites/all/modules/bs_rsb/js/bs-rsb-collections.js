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

                        // For each collection
                        // $("#bs-rsb-collections > div").each(function(){

                        // $("div#block-views-rb-collections-block .views-row").each(function(){
                        //
                        //     console.log($(this).children().children(".article-header").children("h2.node-title").text());
                        //     if($(this).is(':visible')){
                        //        $(this).children().children(".node-content").children(".field-name-field-regne").each(function(){
                        //
                        //            // If the collection has the name of the hash location (tab clicked)
                        //            // Show the div / collection or hide it
                        //            if($(this).children("div.field-items").children("div.field-item").text() == textFamilyName){
                        //
                        //                $(this).parent().parent().parent().show();
                        //            }else{
                        //
                        //                $(this).parent().parent().parent().hide();
                        //            }
                        //        });
                        //
                        //     }
                        //
                        // });
                        $("div#block-views-rb-collections-block .views-row .node-content > .field-name-field-regne").each(function(){

                            // If the collection has the name of the hash location (tab clicked)
                            // Show the div / collection or hide it
                            if($(this).children("div.field-items").children("div.field-item").text() == textFamilyName){

                                $(this).parent().parent().parent().show();
                            }else{

                                $(this).parent().parent().parent().hide();
                            }
                        });
                    }
                }
            }
        }
    };
}(jQuery));