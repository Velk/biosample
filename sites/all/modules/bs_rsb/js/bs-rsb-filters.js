(function ($) {
    Drupal.behaviors.bs_rsb_filters = {
        attach: function (context, settings) {



            /* ---------------------------------------------------------------------------------*/
            /* ------------- START - Ajax retrieve filters from filter categorie ---------------*/
            /* ---------------------------------------------------------------------------------*/

            // var resultsRequirementFilters;
            // var resultsFilters;

            // When user click on a filter category
            $(".bs-rsb-filter-title:not(.special-filters)").click(function(e){
                e.preventDefault();

                // var vidSelected = $(this).children(".bs-rsb-filter-vid").text();

                // console.log($(this).children("p:first-of-type").text());
                var filterName = $(this).children("p:first-of-type").text();

                // Call addFiltersContainer function
                addFiltersContainer(filterName);

                // Initialize and define ajax datas
                var datas = {

                    // vid of the category filter clicked by user
                    vid: $(this).children(".bs-rsb-filter-vid").text()
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

            $(".special-filters").click(function(e){

                var filterName = $(this).children("p:first-of-type").text();

                // Check if the container isn't already created
                if($("body > #overlay-filters-container").length === 0){

                    // Append the special filters container and its structure
                    $("body").append(
                        "<div id='overlay-filters-container'>" +
                        "<p>Critères<span>" + filterName + "</span></p>" +
                        "<i id='ofc-remove' class='fa fa-times' aria-hidden='true'></i>" +
                        "<button id='ofc-reinit-sf'>Réinitialiser les filtres<span>" + filterName + "</span></button>" +
                        "<div id='overlay-filters' class='special-filters'>" +
                            "<div class='sf-container' id='nb-individus'>" +
                                "<p>Nombre d'individus</p>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_individus' value='0' id='nb-individus-0'>" +
                                    "<label for='nb-individus-0'>- de 100</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_individus' value='1' id='nb-individus-1'>" +
                                    "<label for='nb-individus-1'>100 à 1 000</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_individus' value='2' id='nb-individus-2'>" +
                                    "<label for='nb-individus-2'>1 001 à 10 000</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_individus' value='3' id='nb-individus-3'>" +
                                    "<label for='nb-individus-3'>10 001 à 50 000</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_individus' value='4' id='nb-individus-4'>" +
                                    "<label for='nb-individus-4'>+ de 50 000</label>" +
                                "</div>" +
                            "</div>" +
                            "<div class='sf-container' id='nb-echantillons'>" +
                                "<p>Nombre d'échantillons</p>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_echantillons' value='0' id='nb-echantillons-0'>" +
                                    "<label for='nb-echantillons-0'>- de 100</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_echantillons' value='1' id='nb-echantillons-1'>" +
                                    "<label for='nb-echantillons-1'>100 à 1 000</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_echantillons' value='2' id='nb-echantillons-2'>" +
                                    "<label for='nb-echantillons-2'>1 001 à 10 000</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_echantillons' value='3' id='nb-echantillons-3'>" +
                                    "<label for='nb-echantillons-3'>10 001 à 50 000</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='nombre_echantillons' value='4' id='nb-echantillons-4'>" +
                                    "<label for='nb-echantillons-4'>+ de 50 000</label>" +
                                "</div>" +
                            "</div>" +
                            "<div class='sf-container' id='collecte-donnees'>" +
                                "<p>Collecte des données associées aux échantillons</p>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees' value='0' id='collecte-donnees-0'>" +
                                    "<label for='collecte-donnees-0'>Avant</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees' value='1' id='collecte-donnees-1'>" +
                                    "<label for='collecte-donnees-1'>Au moment de la collecte</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees' value='2' id='collecte-donnees-2'>" +
                                    "<label for='collecte-donnees-2'>Après</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees' value='3' id='collecte-donnees-3'>" +
                                    "<label for='collecte-donnees-3'>Suivi longitudinal</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees' value='4' id='collecte-donnees-4'>" +
                                    "<label for='collecte-donnees-4'>Aucune</label>" +
                                "</div>" +
                            "</div>" +
                            "<div class='sf-container' id='suivi-individus'>" +
                                "<p>Suivi des individus</p>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='suivi_individus' value='0' id='suivi-individus-0'>" +
                                    "<label for='suivi-individus-0'>Avant</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='suivi_individus' value='1' id='suivi-individus-1'>" +
                                    "<label for='suivi-individus-1'>Au moment de la collecte</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='suivi_individus' value='2' id='suivi-individus-2'>" +
                                    "<label for='suivi-individus-2'>Après</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='suivi_individus' value='3' id='suivi-individus-3'>" +
                                    "<label for='suivi-individus-3'>Suivi longitudinal</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='suivi_individus' value='4' id='suivi-individus-4'>" +
                                    "<label for='suivi-individus-4'>Aucun</label>" +
                                "</div>" +
                            "</div>" +
                            "<div class='sf-container' id='echantillons-controle'>" +
                                "<p>La collection dispose-t-elle d'échantillons de contrôles ?</p>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='echantillons_controle' value='yes' id='echantillons-controle-0'>" +
                                    "<label for='echantillons-controle-0'>Oui</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='echantillons_controle' value='no' id='echantillons-controle-1'>" +
                                    "<label for='echantillons-controle-1'>Non</label>" +
                                "</div>" +
                            "</div>" +
                            "<div class='sf-container' id='echantillons-sup'>" +
                                "<p>Collecte d'échantillons supplémentaires</p>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_echantillons_sup' value='0' id='echantillons-sup-0'>" +
                                    "<label for='echantillons-sup-0'>Collecte continue</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_echantillons_sup' value='1' id='echantillons-sup-1'>" +
                                    "<label for='echantillons-sup-1'>A la demande</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_echantillons_sup' value='2' id='echantillons-sup-2'>" +
                                    "<label for='echantillons-sup-2'>Aucune</label>" +
                                "</div>" +
                            "</div>" +
                            "<div class='sf-container' id='donnees-sup'>" +
                                "<p>Collecte de données supplémentaires</p>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees_sup' value='0' id='donnees-sup-0'>" +
                                    "<label for='donnees-sup-0'>Collecte continue</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees_sup' value='1' id='donnees-sup-1'>" +
                                    "<label for='donnees-sup-1'>A la demande</label>" +
                                "</div>" +
                                "<div class='sf-choice-container'>" +
                                    "<input type='radio' name='collecte_donnees_sup' value='2' id='donnees-sup-2'>" +
                                    "<label for='donnees-sup-2'>Aucune</label>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div id='ofc-request-results-sf'>" +
                        "</div>" +
                        "</div>"
                    );

                    // Call toDisableScroll function
                    toDisableScroll();
                }

                // Call toRetrieveSpecialFilters function
                toRetrieveSpecialFilters();

                // Call specialFiltersAjaxRequest function
                specialFiltersAjaxRequest();

            });

            function toRetrieveSpecialFilters(){

                // Set user choice stored in session
                $(".sf-container > .sf-choice-container > input").each(function(){

                    // Loop on session
                    for(var s = 0 ; s < sessionStorage.length ; s++) {

                        // Check if session parameter is a special filter
                        if (Object.keys(sessionStorage)[s].match("^sf_")) {

                            var toCompareName = Object.keys(sessionStorage)[s].split("sf_")[1];
                            var toCompareValue = sessionStorage.getItem(Object.keys(sessionStorage)[s]);

                            // When user open special filter container
                            // it sets checkbox depending on his last choices
                            if(
                                toCompareName === $(this).attr("name") &&
                                toCompareValue ===  $(this).val()
                            ){
                                // console.log($(this).attr("name"));
                                // console.log($(this).val());
                                $(this).prop( "checked", true );
                            }
                        }
                    }
                });
            }

            $("body").on("click", ".sf-container > .sf-choice-container > input", function(){

                /* Store into session, special filters user choice */

                var toStockSpecialFilterName = "sf_" + $(this).attr('name');
                var specialFilterValue = $(this).val();

                // Set into session the value of the filter
                sessionStorage.setItem(
                    toStockSpecialFilterName,
                    specialFilterValue
                );

                // Call specialFiltersAjaxRequest function
                specialFiltersAjaxRequest();

            });

            $("body").on("click", "#sf-result-consult", function(){

                // Call toShowResults function
                toShowResults();

                if($("#sf-result-consult > i").length > 0){

                    // Remove the overlay
                    $('#overlay-filters-container').fadeOut('slow', function(){
                        $('#overlay-filters-container').remove();
                    });
                }

                // Call toEnableScroll function
                toEnableScroll();
            });

            function specialFiltersAjaxRequest(){

                /* Get special filters user choice for Ajax request */

                // Array containing every special filters
                var arraySpecialFilters = [];
                // Array containing one special filter with his value
                var arraySpecialFilter = [];

                // Loop on session
                for(var s = 0 ; s < sessionStorage.length ; s++){

                    if(Object.keys(sessionStorage)[s].match("^sf_")){

                        // Retrieve and split the filter name
                        var specialFilterName = Object.keys(sessionStorage)[s].split("sf_")[1];

                        // Push filter name
                        arraySpecialFilter.push(specialFilterName);
                        // Push its value
                        arraySpecialFilter.push(sessionStorage.getItem(Object.keys(sessionStorage)[s]));

                        // Push into array containing every filters, the array containing filter name with its value
                        arraySpecialFilters.push(arraySpecialFilter);

                        // Reinitialize array containing filter name and its value
                        // In the purpose to store an other special filter with a clean array
                        arraySpecialFilter = [];
                    }
                }

                // Initialize and define ajax datas
                var datas = {

                    arraySpecialFilters: arraySpecialFilters,
                    arraySpecialFiltersLength: arraySpecialFilters.length
                };

                $.ajax({
                    url:Drupal.settings.basePath + 'ressources-biologiques/home/criteres/special-filters',
                    dataType: 'json',
                    type: 'GET',
                    data: datas,
                    success: function(result){

                        // Declare global variable to allow to get result
                        arrayFinalResults = result.arrayFinalResults;

                        if(result.arrayFinalResultsSize > 0){

                            if($("#sf-result-consult").length > 0){

                                $("#sf-result-consult > p").text("Nous avons trouvé : " + result.arrayFinalResultsSize + " résultat(s)");

                                if($("#sf-result-consult > i").length == 0){
                                    $("#sf-result-consult").append("<i class='fa fa-eye'></i>");
                                }

                            }else{
                                $("#ofc-request-results-sf").append(
                                    "<div id='sf-result-consult'>" +
                                    "<p>" +
                                    "Nous avons trouvé : " + result.arrayFinalResultsSize + " résultat(s)" +
                                    "</p>" +
                                    "<i class='fa fa-eye'></i>" +
                                    "</div>"
                                );
                            }

                            $("#sf-result-consult").css({
                                "border": "1px solid rgb(255, 255, 255)",
                                "cursor": "pointer",
                                "background-color": "transparent"
                            });

                            $("#sf-result-consult").mouseenter(function(){
                                $("#sf-result-consult").css("background-color", "rgba(255, 255, 255, 0.18)");
                            });
                            $("#sf-result-consult").mouseleave(function(){
                                $("#sf-result-consult").css("background-color", "transparent");
                            });


                        }else{
                            if($("#sf-result-consult").length > 0){

                                $("#sf-result-consult > p").text("Aucun résultat ne correspond à votre recherche");
                                $("#sf-result-consult > i").remove();

                            }else{
                                $("#ofc-request-results-sf").append(
                                    "<div id='sf-result-consult'>" +
                                    "<p>" +
                                    "Aucun résultat ne correspond à votre recherche" +
                                    "</p>" +
                                    "</div>"
                                );
                            }

                            $("#sf-result-consult").css({
                                "border": "none",
                                "cursor": "default",
                                "background-color": "transparent"
                            });

                            $("#sf-result-consult").mouseenter(function(){
                                $("#sf-result-consult").css("background-color", "transparent");
                            });
                            $("#sf-result-consult").mouseleave(function(){
                                $("#sf-result-consult").css("background-color", "transparent");
                            });

                        }

                    }
                });
            }

            function toShowResults(){

                // Hide every collection preview
                $("#block-views-rb-collections-block div.views-row").hide();

                for(var i = 0 ; i < arrayFinalResults.length ; i++){

                    // Display only collection preview corresponding to user choice
                    $("#article-" + arrayFinalResults[i]).parent().show();
                }

                // // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
            }

            // Reinit every special filters
            $("body").on("click", "#ofc-reinit-sf", function () {

                // Initiliaze an array containing session parameter to delete
                var arrayToDelete = [];

                // Loop on session
                for(var s = 0 ; s < sessionStorage.length ; s++) {

                    // Check if session parameter is a special filter
                    if (Object.keys(sessionStorage)[s].match("^sf_")) {

                        // Push it into the array
                        arrayToDelete.push(Object.keys(sessionStorage)[s]);
                    }
                }

                // Browse through the array
                for(var i = 0 ; i < arrayToDelete.length ; i++){
                    // Remove every special filter in the session
                    sessionStorage.removeItem(arrayToDelete[i]);
                }

                // Uncheck every inputs
                $(".sf-choice-container > input").prop( "checked", false );

                // Call specialFiltersAjaxRequest function
                specialFiltersAjaxRequest();
            });

            /* ---------------------------------------------------------------------------------- */
            /* ---------------------------- Add : Filters container ----------------------------- */
            /* ---------------------------------------------------------------------------------- */

            function addFiltersContainer(filterName) {

                // Check if the container isn't already created
                if($("body > #overlay-filters-container").length === 0){

                    // Append the filters container and its structure
                    /* Exigence - Préférence - Indifférent */
                    $("body").append(
                        "<div id='overlay-filters-container'>" +
                        "<p>Critères<span>" + filterName + "</span></p>" +
                        "<i id='ofc-remove' class='fa fa-times' aria-hidden='true'></i>" +
                        "<button id='ofc-reinit'>Réinitialiser les filtres<span>" + filterName + "</span></button>" +
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

                    // Call toDisableScroll function
                    toDisableScroll();
                }
            }

            /* ---------------------------------------------------------------------------------- */
            /* ------------------------ Session : Set filters choice ---------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // Set filter choice in session
            // When user click on a filter input
            $("body").on("click", ".ofc-form-choice > input", function(){

                // Retrieve the filter name
                var filterName = $(this).parent().parent().children("p").text();
                // Retrieve the filter value
                var filterValue = $(this).val();
                // filterValue = filterValue + "-8";
                // console.log($(this).parent().parent().parent().parent().children("#vid-selected").text());
                // var vidSelected = $(this).parent().parent().parent().parent().children("#vid-selected").text();
                // filterValue = filterValue + "-" + vidSelected;

                // tab[filterName] = filterValue;
                // console.log(tab);

                // Set into session the value of the filter
                sessionStorage.setItem(
                    filterName,
                    filterValue
                );
            });

            /* ---------------------------------------------------------------------------------- */
            /* ---------------------- Retrieve : Session filters choice ------------------------- */
            /* ---------------------------------------------------------------------------------- */

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

            /* ---------------------------------------------------------------------------------- */
            /* ------------------------ Ajax : Session filters choice --------------------------- */
            /* ---------------------------------------------------------------------------------- */

            /* IMPORTANT! - For element dynamically added, you need to use .on() event listener */

            // When user clicks on filter input (requirement || preference || indifferent)
            $("body").on("click", ".ofc-form-choice > input", function() {

                //Call retrieveSessionFilters()
                retrieveSessionFilters();
            });

            /**
             * Implements retrieveSessionFilters()
             */
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

                requiredFilterAjax(arrayRequirementFilterNames);
                otherFilterAjax(arrayFilterNames);

            }

            /* ---------------------------------------------------------------------------- */
            /* --------------------- Ajax request - Requirement filters -------------------- */
            /* ---------------------------------------------------------------------------- */

            /**
             * Implements requiredFilterAjax()
             *
             * @param arrayRequirementFilterNames
             */
            function requiredFilterAjax(arrayRequirementFilterNames){

                // Call setLoaderCriteriasResults()
                setLoaderCriteriasResults();

                /*
                 Then check the length of the array containing filter's name
                    - If the length is > 0 - There is at least 1 filter name
                      So let throw an ajax request
                    - If the length equals 0 - There is no data
                      So display a message saying there is no result
                  */
                if(arrayRequirementFilterNames.length > 0){

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

                                // for(var t = 0 ; t < result.resultsFiltersRequirement.length ; t++){
                                //     console.log(result.resultsFiltersRequirement[t]);
                                // }

                                // Initialize and define the message
                                var message = 'Nous avons trouvé : ' + result.rowCountFiltersRequirement + ' résultat(s)<br>correspondant à vos éxigences';

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
                                var message = 'Aucun résultat ne correspond à votre recherche pour vos éxigences.';

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
                    var message = 'Aucun résultat ne correspond à votre recherche pour vos éxigences.';

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

            /**
             * Implements otherFilterAjax()
             *
             * @param arrayFilterNames
             */
            function otherFilterAjax(arrayFilterNames){

                // Call setLoaderCriteriasResults()
                setLoaderCriteriasResults();

                /*
                 Then check the length of the array containing filter's name
                    - If the length is > 0 - There is at least 1 filter name
                      So let throw an ajax request
                    - If the length equals 0 - There is no data
                      So display a message saying there is no result
                  */
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

                if( $( "#loader-criterias-container" ).length ){

                    // Call removeLoaderCriteriasResults()
                    removeLoaderCriteriasResults();
                }

            }

            /* User choose which result he wants to see */
            $("body").on("click", "#ofc-requirement-filters-results", function(){

                if($("#ofc-requirement-filters-results i").is(":visible")){

                    displaySelectedResult(resultsRequirementFilters);
                }
            });

            $("body").on("click", "#ofc-filters-results", function(){

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

                // Call toEnableScroll function
                toEnableScroll();

                // // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
            }

            /* ---------------------------------------------------------------------------------- */
            /* ---------------------- Loader : Waiting criterias results ------------------------ */
            /* ---------------------------------------------------------------------------------- */

            function setLoaderCriteriasResults(){

                if( $( "#loader-criterias-container" ).length == 0 ){

                    $("#overlay-filters-container").append(
                        "<div id='loader-criterias-container'>" +
                        "<div id='loader'></div>" +
                        "<p>Chargement ...</p>" +
                        "</div>"
                    );
                }

                if( $( "#loader-criterias-container" ).length ){

                    $("#ofc-request-results").hide();
                }
            }

            function removeLoaderCriteriasResults(){

                if( $( "#loader-criterias-container" ).length ){

                    $( "#loader-criterias-container" ).remove();
                }

                if( $( "#loader-criterias-container" ).length == 0){

                    $("#ofc-request-results").show();
                }
            }




            /* ---------------------------------------------------------------------------------- */
            /* ------------------------------- Cross : On Click --------------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // When user click on the overlay's cross : Overlay containing filters disappear
            $("body").on('click', 'i#ofc-remove', function(){

                // Remove the overlay
                $('#overlay-filters-container').fadeOut('slow', function(){
                    $('#overlay-filters-container').remove();
                });

                // Call toEnableScroll function
                toEnableScroll();

                // // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
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

                // Go back to home family filter
                $("#bs-rsb-families li").removeClass("bs-rsb-family-selected");
                $("#all-regne").addClass("bs-rsb-family-selected");
                window.location.hash = "#collections";

                // Show every collection
                $("#block-views-rb-collections-block .views-row").show();
            });

            // toDisableScroll function
            function toDisableScroll(){

                $("body").css("overflow-y", "hidden");
            }

            // toEnableScroll function
            function toEnableScroll(){

                $("body").css("overflow-y", "scroll");
            }

            /* ---------------------------------------------------------------------------------- */
            /* ------------------------------ Remove last error --------------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // Remove the last error to have a clear drupal message
            if(
                // $(".messages.status > ul > li:first-of-type").text() === "Erreur. Au moins un champs à caractère obligatoire n'est pas rempli." &&
                // $(".messages.status > ul > li:last-of-type").text() === "Un récapitulatif de votre demande a été envoyé sur l'adresse e-mail renseignée."
                $(".messages.status > ul > li:first-of-type:contains(\"Erreur. Au moins un champs à caractère obligatoire n'est pas rempli.\")").is(':visible') &&
                $(".messages.status > ul > li:last-of-type:contains(\"Un récapitulatif de votre demande a été envoyé sur l'adresse e-mail renseignée.\")").is(':visible')
            ) {
                // $(".messages.status > ul > li:contains(\"Erreur. Au moins un champs à caractère obligatoire n'est pas rempli.\")").remove();
                $(".messages.status > ul > li:contains(\"Erreur. Au moins un champs à caractère obligatoire n'est pas rempli.\")").css("display","none");
            }

        }
    };
}(jQuery));
