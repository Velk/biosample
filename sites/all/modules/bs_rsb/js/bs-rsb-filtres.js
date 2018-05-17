(function ($) {
    Drupal.behaviors.bs_rsb_filtres = {
        attach: function (context, settings) {

            /* -----------------------------------------------------------------------------------------------*/
            /* -------------------------------------START - FILTERS-------------------------------------------*/
            /* -----------------------------------------------------------------------------------------------*/

            // Hide Checkboxes over the five first
            $(".bs-rsb-filter-datas-checkbox:nth-child(n + 6)").hide();

            // Display filter criterias
            $(".bs-rsb-filter-title").click(function(){

                // Display Filter Checkboxes and search bar depending of the Filter category clicked
                $(this).parent().children(".bs-rsb-filter-datas").toggle();
            });

            // If the button to see either more or less criterias is clicked
            $(".bs-rsb-filter-datas-checkboxes > button").click(function(){

                // If 'Plus de critères' is clicked, display
                $(this).parent().children(".bs-rsb-filter-datas-checkbox:nth-child(n + 6)").toggle();

                // Retrieve the current button text : either 'Plus de critère' or 'Moins de critères'
                var text = $(this).text();

                // Change the text
                $(this).text(text == "Plus de critères" ? "Moins de critères" : "Plus de critères");
            });


            // If text is clicked check or uncheck the checkbox corresponding
            $(".bs-rsb-filter-datas-checkbox > p").click(function(){

                // Retrieve the current value of the checkbox : true or false
                var isChecked = $(this).parent().children("input").prop('checked');

                // Change the value
                $(this).parent().children("input").prop('checked', isChecked == true ? false : true);
            });

            // Change appearance of Filter criterias when hovered
            $(".bs-rsb-filter-datas-checkbox > *").mouseenter(function(){
                $(this).parent().css("background-color", "#67b1d6");
            });
            $(".bs-rsb-filter-datas-checkbox > *").mouseleave(function(){
                $(this).parent().css("background-color", "#fff");
            });

            // Reinitialize checkboxes
            $("#bs-rsb-filters-container > button").click(function(){

                // Uncheck every checkboxes
                $(".bs-rsb-filter-datas-checkbox > input").prop('checked', false);
            });

            /* -----------------------------------------------------------------------------------------------*/
            /* --------------------------------------END - FILTERS--------------------------------------------*/
            /* -----------------------------------------------------------------------------------------------*/

        }
    };
}(jQuery));
