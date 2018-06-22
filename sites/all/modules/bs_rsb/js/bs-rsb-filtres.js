(function ($) {
    Drupal.behaviors.bs_rsb_filtres = {
        attach: function (context, settings) {

            /* ---------------------------------------------------------------------------------*/
            /* ------------- START - Ajax retrieve filters from filter categorie ---------------*/
            /* ---------------------------------------------------------------------------------*/

            var resultsRequirementFilters;
            var resultsFilters;

            // When user click on a filter category
            $(".bs-rsb-filter-title").click(function(e){
                e.preventDefault();

                // Check if the container isn't already created
                if($("body > #overlay-filters-container").length === 0){

                    // Append the filters container and its structure
                    /* Exigence - Préférence - Indifférent */
                    $("body").append(
                        "<div id='overlay-filters-container'>" +
                            "<p>Critères</p>" +
                            "<i id='ofc-remove' class='fa fa-times' aria-hidden='true'></i>" +
                            "<button id='ofc-reinit'>Réinitialiser les filtres</button>" +
                            "<div id='ofc-explaination'>" +
                                "<p>Explications du système de choix des filtres</p>" +
                                "<p>Exigence</p>" +
                                "<p>Préférence</p>" +
                                "<p>Indifférent</p>" +
                                "<p>Nom du filtre</p>" +
                                "<input type='radio' name='filter_explanation' disabled>" +
                                "<input type='radio' name='filter_explanation' disabled>" +
                                "<input type='radio' name='filter_explanation' disabled checked='checked'>" +
                            "</div>" +
                            "<div id='overlay-filters'>" +
                            "</div>" +
                            "<div id='ofc-request-results'>" +
                            "</div>" +
                        "</div>"
                    );
                }

                // Initialize and define ajax datas
                var datas = {

                    // tid of the category filter clicked by user
                    tid: $(this).children(".bs-rsb-filter-tid").text()
                };

                $.ajax({
                    url:Drupal.settings.basePath + 'ressources-biologiques/home/criteres',
                    dataType: 'json',
                    type: 'GET',
                    data: datas,
                    success: function(result){
                        if(result.resultsCriteres != null){

                            // Add filters and their structure
                            $('div#overlay-filters-container > div#overlay-filters').html(result.resultsCriteres);
                        }
                    }
                });

            });

            /* ---------------------------------------------------------------------------------*/
            /* --------------- END - Ajax retrieve filters from filter categorie ---------------*/
            /* ---------------------------------------------------------------------------------*/


            /* ---------------------------------------------------------------------------------*/
            /* ------------------------------- START - Session ---------------------------------*/
            /* ---------------------------------------------------------------------------------*/

            /* Set filter choice in session */
            // When user click on a filter input
            $("body").on("click", ".ofc-form-choice > input", function(){

                // Retrieve the filter name
                var filterName = $(this).parent().parent().children("p").text();
                // Retrieve the filter value
                var filterValue = $(this).val();

                // Set into session the value of the filter
                sessionStorage.setItem(
                    filterName,
                    filterValue
                );
            });

            // When user click on filter category
            $(".bs-rsb-filter").click(function(){

                // Check if the filter container is visible
                if($("#overlay-filters-container").is(':visible')){

                    // Call setSessionFilterValue() with a setTimeout
                    // to take into account the each() event
                    setTimeout(setSessionFilterValue, 750);
                }
            });

            /**
             * Implements setSessionFilterValue()
             */
            function setSessionFilterValue(){

                // For each input
                $(".overlay-filter-container .ofc-form-choice > input").each(function(){

                    // Get the name of the filter
                    var filterName = $(this).parent().parent().children("p").text();
                    // Get the value stored in session
                    var filterValue = sessionStorage.getItem(filterName);

                    // Compare if the filter's input checked isn't already checked
                    if(
                        $(this).val() == filterValue
                        && $(this).is( ":checked" ) == false
                    ){
                        // Check the input like session storage previous datas
                        $(this).prop( "checked", true );
                    }
                });

                //Call retrieveSessionFilters()
                retrieveSessionFilters();
            }

            /* ---------------------------------------------------------------------------------*/
            /* -------------------------------- END - Session ----------------------------------*/
            /* ---------------------------------------------------------------------------------*/

            /* IMPORTANT! - For element dynamically added, you need to use .on() event listener */

            /* Ajax - Input elements */

            // When user clicks on filter input (requirement || preference || indifferent)
            $("body").on("click", ".ofc-form-choice > input", function(){

                //Call retrieveSessionFilters()
                retrieveSessionFilters();

                // Browse for each input
                // $("body .ofc-form-choice > input").each(function(){
                //
                //     /*
                //      Check if the input is :
                //         - checked &&
                //         - value is different than "indifferent" &&
                //         - value equals "requirement"
                //      */
                //     if($(this).is(':checked') && $(this).val() !== "indifferent" && $(this).val() === "requirement"){
                //
                //         // Push into array containing required filter names, the name of the filter
                //         arrayRequirementFilterNames.push($(this).parent().parent().children("p").text());
                //     }
                //
                //     /*
                //      Check if the input is :
                //         - checked &&
                //         - value is different than "indifferent"
                //      */
                //     if($(this).is(':checked') && $(this).val() !== "indifferent"){
                //
                //         // Push into array containing filter names, the name of the filter
                //         arrayFilterNames.push($(this).parent().parent().children("p").text());
                //     }
                // });
            });

            function retrieveSessionFilters(){

                // Initialize an empty array intended to stock required filter names
                var arrayRequirementFilterNames = [];
                // Initialize an empty array intended to stock filter's name
                var arrayFilterNames = [];


                // Loop on session
                for(var s = 0 ; s < sessionStorage.length ; s++){

                    /*
                     Get the value associated to the key and compare if the value is :
                        - value equals "requirement"
                     */
                    if(sessionStorage.getItem(Object.keys(sessionStorage)[s]) === "requirement"){

                        var filterName = Object.keys(sessionStorage)[s];
                        arrayRequirementFilterNames.push(filterName);
                    }

                    /*
                     Get the value associated to the key and compare if the value is :
                        - different than "indifferent"
                        - That's to say equals to requirement OR preference
                     */
                    if(
                        sessionStorage.getItem(Object.keys(sessionStorage)[s]) === "requirement" ||
                        sessionStorage.getItem(Object.keys(sessionStorage)[s]) === "preference"
                    ){

                        var filterName = Object.keys(sessionStorage)[s];
                        arrayFilterNames.push(filterName);
                    }
                }

                // console.log("LENGTH : " + arrayRequirementFilterNames.length);

                requiredFilterAjax(arrayRequirementFilterNames);
                otherFilterAjax(arrayFilterNames);
            }

            /* ---------------------------------------------------------------------------- */
            /* --------------------- Ajax request - Requirement filters -------------------- */
            /* ---------------------------------------------------------------------------- */

            function requiredFilterAjax(arrayRequirementFilterNames){

                /*
                 Then check the length of the array containing filter's name
                    - If the length is > 0 - There is at least 1 filter name
                      So let throw an ajax request
                    - If the length equals 0 - There is no data
                      So display a message saying there is no result
                  */
                if(arrayRequirementFilterNames.length > 0){

                    // console.log("entre");
                    //
                    // console.log("LENGTH : " + arrayRequirementFilterNames.length);
                    // Initialize and define ajax datas
                    var datas = {
                        requirement_filter_names: arrayRequirementFilterNames,
                        requirement_filter_size: arrayRequirementFilterNames.length
                    };

                    // Ajax request
                    $.ajax({
                        url:Drupal.settings.basePath + 'ressources-biologiques/home/criteres/filters',
                        dataType: 'json',
                        type: 'GET',
                        data: datas,
                        success: function(result){

                            // If the ajax request returns results of requirement filters
                            if(result.resultsFiltersRequirement.length > 0){

                                for(var t = 0 ; t < result.resultsFiltersRequirement.length ; t++){
                                    console.log(result.resultsFiltersRequirement[t]);
                                }

                                // Initialize and define the message
                                var message = 'Nous avons trouvé : ' + result.rowCountFiltersRequirement + ' résultat(s)<br>correspondant à vos filtres d\'éxigence';

                                // Initialize and define the id of the result container
                                var idDiv = 'ofc-requirement-filters-results';

                                // Initialize and define boolean saying there is result
                                var isResult = true;

                                // Initialize and define a variable containing the result of requirement filters
                                resultsRequirementFilters = result.resultsFiltersRequirement;

                                // Call appendResult function
                                appendResult(message, idDiv, isResult);

                                // If the ajax request returns no result
                            }else if(result.resultsFiltersRequirement.length === 0){

                                // Initialize and define the message
                                var message = 'Aucun résultat ne correspond à votre recherche pour vos filtres d\'éxigence.';

                                // Initialize and define the id of the result container
                                var idDiv = 'ofc-requirement-filters-results';

                                // Initialize and define boolean saying there is no result
                                var isResult = false;

                                // Initialize and define a variable containing the result of requirement filters
                                // Here there is nothing
                                // var results = result.resultsFiltersRequirement;

                                // Call appendResult function
                                appendResult(message, idDiv, isResult);

                            }
                        }
                    });

                }else if(arrayRequirementFilterNames.length === 0){

                    // Initialize and define the message
                    var message = 'Aucun résultat ne correspond à votre recherche pour vos filtres d\'éxigence.';

                    // Initialize and define the id of the result container
                    var idDiv = 'ofc-requirement-filters-results';

                    // Initialize and define boolean saying there is no result
                    var isResult = false;

                    // Initialize and define a variable with "null" as value
                    // var results = null;

                    // Call appendResult function
                    appendResult(message, idDiv, isResult);

                }
            }

            /* ---------------------------------------------------------------------------- */
            /* -------------- Ajax request - Requirement & preference filters ------------- */
            /* ---------------------------------------------------------------------------- */

            function otherFilterAjax(arrayFilterNames){

                /*
                 Then check the length of the array containing filter's name
                    - If the length is > 0 - There is at least 1 filter name
                      So let throw an ajax request
                    - If the length equals 0 - There is no data
                      So display a message saying there is no result
                  */
                // console.log(arrayFilterNames.length);
                if(arrayFilterNames.length > 0){

                    // Initialize and define ajax datas
                    var datas = {
                        filter_names: arrayFilterNames,
                        filter_size: arrayFilterNames.length
                    };

                    // Ajax request
                    $.ajax({
                        url:Drupal.settings.basePath + 'ressources-biologiques/home/criteres/filters',
                        dataType: 'json',
                        type: 'GET',
                        data: datas,
                        success: function(result){

                            // If the ajax request returns results of requirement filters
                            if(result.resultsFilters.length > 0){

                                // Initialize and define the message
                                var message = 'Nous avons trouvé : ' + result.rowCountFilters + ' résultat(s).';

                                // Initialize and define the id of the result container
                                var idDiv = 'ofc-filters-results';

                                // Initialize and define boolean saying there is result
                                var isResult = true;

                                // Initialize and define a variable containing the result of requirement filters
                                resultsFilters = result.resultsFilters;

                                // Call appendResult function
                                appendResult(message, idDiv, isResult);

                                // If the ajax request returns no result
                            }else if(result.resultsFilters.length === 0){

                                // Initialize and define the message
                                var message = 'Aucun résultat ne correspond à votre recherche pour vos filtres.';

                                // Initialize and define the id of the result container
                                var idDiv = 'ofc-filters-results';

                                // Initialize and define boolean saying there is no result
                                var isResult = false;

                                // Initialize and define a variable containing the result of requirement filters
                                // Here there is nothing
                                // var results = result.resultsFilters;

                                // Call appendResult function
                                appendResult(message, idDiv, isResult);

                            }
                        }
                    });

                }else if(arrayFilterNames.length === 0){

                    // Initialize and define the message
                    var message = 'Aucun résultat ne correspond à votre recherche pour vos filtres.';

                    // Initialize and define the id of the result container
                    var idDiv = 'ofc-filters-results';

                    // Initialize and define boolean saying there is no result
                    var isResult = false;

                    // Initialize and define a variable with "null" as value
                    // var results = null;

                    // Call appendResult function
                    appendResult(message, idDiv, isResult);

                }
            }

            /**
             * Implements appendResult() method
             *
             * @param message
             * @param isResult
             * @param results
             */
            function appendResult(message, idDiv, isResult){

                var consultResults = "";

                if(isResult){
                    consultResults = '<i class="fa fa-eye"></i>';
                }

                // Append the container with the appropriate message
                if($('div#overlay-filters-container > #ofc-request-results > #' + idDiv).length === 0){

                    $('div#overlay-filters-container > #ofc-request-results').append(
                        '<div id="' + idDiv + '">' +
                            '<p>' +
                            message +
                            '</p>' +
                            consultResults +
                        '</div>'
                    );
                // If the result container exists
                }else if($('div#overlay-filters-container > #ofc-request-results > #' + idDiv).length !== 0){

                    // Update the message
                    $("#ofc-request-results > #" + idDiv).html(
                        '<p>' +
                        message +
                        '</p>' +
                        consultResults
                    );
                }

                /* Design results */
                // Design for result container who has eyes icon
                $("#ofc-requirement-filters-results, #ofc-filters-results").has("i").css({
                    "padding" : "10px 20px",
                    "box-sizing" : "border-box",
                    "border" : "1px solid #fff",
                    "cursor" : "pointer"
                });

                // Design for result who hasn't eyes icon
                $("#ofc-requirement-filters-results:not(:has(i)), #ofc-filters-results:not(:has(i))").css({
                    "padding" : "0",
                    "box-sizing" : "border-box",
                    "border" : "none",
                    "cursor" : "default"
                });

                // Design when result containing eyes icon is hovered
                $("#ofc-requirement-filters-results, #ofc-filters-results").has("i")
                    .mouseenter(function(){
                        $(this).has("i").css({
                            "background-color" : "#ffffff2e"
                        });
                    })
                    .mouseleave(function(){
                        $(this).has("i").css({
                            "background-color" : "transparent"
                        });
                    });

            }

            /* User choose which result he wants to see */
            $("body").on("click", "#ofc-requirement-filters-results", function(){
                console.log("Click on requirement filters");
                if($("#ofc-requirement-filters-results i").is(":visible")){

                    displaySelectedResult(resultsRequirementFilters);
                }

            });

            $("body").on("click", "#ofc-filters-results", function(){
                console.log("Click on filters");
                if($("#ofc-filters-results i").is(":visible")){

                    displaySelectedResult(resultsFilters);
                }
            });

            function displaySelectedResult(resultArray){

                // Hide every collection elements
                $(".node-rb-collections").parent().hide();

                // Show every collection elements containing the node number retrieved with ajax
                for(var k = 0 ; k < resultArray.length ; k++){

                    $("#article-" + resultArray[k]).parent().show();
                }

                // Remove the filter overlay
                $('#overlay-filters-container').remove();
            }

            /* ---------------------------------------------------------------------------------- */
            /* ------------------------------- CROSS : ON CLICK --------------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // When user click on the overlay's cross : Overlay containing filters disappear
            $("body").on('click', 'i#ofc-remove', function(){

                // Remove the overlay
                $('#overlay-filters-container').fadeOut('slow', function(){
                    $('#overlay-filters-container').remove();
                });
            });

            /* ---------------------------------------------------------------------------------- */
            /* --------------------------- REINIT BUTTON : ON CLICK ----------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // When user click on the overlay's reinitialize filters button :
            // checkboxes are set to "indifferent" and overlay disappear
            $("body").on("click", "#ofc-reinit", function () {

                // Check checkboxes with "indifferent" value
                $(".ofc-form-choice > input").each(function(){

                    // If checkbox value is "indifferent" && the checkbox isn't check
                    if($(this).val() == "indifferent" && $(this).is( ":checked" ) == false ){
                        // Check the checkbox
                        $(this).prop( "checked", true );
                    }

                    // If user click on the cross, it sets every filter of the filter category to "indifferent"
                    var filterName = $(this).parent().parent().children("p").text();
                    sessionStorage.setItem(filterName, "indifferent");
                });

                // Call retrieveSessionFilters()
                retrieveSessionFilters();

            });

            /* ---------------------------------------------------------------------------------- */
            /* ---------------------- REINIT ALL FILTERS BUTTON : CLICK ------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // When user click on reinitialize all filters button
            $("#reinit-all-filters").click(function(){

                // Browse every parameters stocked in session
                for(var i = 0 ; i < sessionStorage.length ; i++){

                    // Check if the value of the parameter is "requirement" or "preference" or "indifferent"
                    if(
                        sessionStorage.getItem(Object.keys(sessionStorage)[i]) === "requirement" ||
                        sessionStorage.getItem(Object.keys(sessionStorage)[i]) === "preference" ||
                        sessionStorage.getItem(Object.keys(sessionStorage)[i]) === "indifferent"
                    ){
                        // Set the value to indifferent in purpose to reinitialize every filter
                        sessionStorage.setItem(Object.keys(sessionStorage)[i], "indifferent");
                    }

                }

                // Show every collection
                $("#block-views-rb-collections-block .views-row").show();
            });

        }
    };
}(jQuery));
