(function ($) {
    Drupal.behaviors.bs_rsb_map = {};

    Drupal.behaviors.bs_rsb_map.getNumberFiltersSelected = function() {

        /* ------------------------------------------------------------------------- */
        /* ---------------------- Filters selected number -------------------------- */
        /* ------------------------------------------------------------------------- */

        // Initialize numberFiltersSelected that would allow to get number of filters
        var numberFiltersSelected = 0;

        // Browse into session
        for(var s = 0 ; s < sessionStorage.length ; s++){

            // Check if the value of the filter isn't "indifferent"
            if( sessionStorage.getItem(Object.keys(sessionStorage)[s]) !== "indifferent" ){

                // Increment numberFiltersSelected
                numberFiltersSelected++;
            }
        }

        // Update text : "répondant(s) au(x)  X critère(s) séléctionné(s)"
        $("#special-filters-infos-map > span.rsb-value").text(numberFiltersSelected);

        /* ------------------------------------------------------------------------- */
        /* --------------------------- Pins on the map ----------------------------- */
        /* ------------------------------------------------------------------------- */

        var isSpecialFilters = false;

        for(var i = 0 ; i < sessionStorage.length ; i++){
            // console.log(Object.keys(sessionStorage)[i]);
            if( Object.keys(sessionStorage)[i].match("^[0-9]_sf_") ){
                isSpecialFilters = true;
            }
        }
        // console.log(isSpecialFilters);

        // if( isSpecialFilters ){

            // Init array intended to contain node ID
            var arrayNodeID = [];

            // Browse every collection card
            $(".view-rb-collections .node-rb-collections").each(function(){

                // If it's visible
                if( $(this).is(":visible") ){

                    // Retrive the ID and split to get exclusively the node ID
                    var nodeID = $(this).attr('id');
                    nodeID = nodeID.split('article-')[1];

                    // Push node ID into array
                    arrayNodeID.push(nodeID);
                }
            });

            /* If the array is empty, show every collections cards and redo browsing */
            if(arrayNodeID.length === 0){

                // Otherwise show every collection
                $("#block-views-rb-collections-block div.views-row").show();

                // Browse every collection card
                $(".view-rb-collections .node-rb-collections").each(function(){

                    // If it's visible
                    if( $(this).is(":visible") ){

                        // Retrive the ID and split to get exclusively the node ID
                        var nodeID = $(this).attr('id');
                        nodeID = nodeID.split('article-')[1];

                        // Push node ID into array
                        arrayNodeID.push(nodeID);
                    }
                });
            }

            // Remove every markers on the map before ajax request
            $(".rsb-markers").each(function(){
                $(this).remove();
            });

            // Ajax request
            var datas = {
                node_ID: arrayNodeID
            };

            $.ajax({
                url: Drupal.settings.basePath + 'ressources-biologiques/home/pins',
                dataType: 'json',
                type: 'GET',
                data: datas,
                success: function (result) {

                    for(var i = 0 ; i < result.arrayResultsPostalCode.length ; i++){

                        // Get postal code and split to retrieve exclusively the two first chars
                        var postalCode = result.arrayResultsPostalCode[i];
                        postalCode = postalCode.toString().slice(0, 2);

                        // Boolean to verify if pin is set or not
                        var isPinExist = false;
                        // Browse every marker
                        $(".rsb-markers").each(function(){

                            // If the pin is already implement, set boolean to true
                            if( $(this).attr('id') === ("rsb-marker-" + postalCode) ){
                                isPinExist = true;
                            }
                        });

                        // If pin isn't set
                        if( isPinExist === false ){

                            // Append the pin on the map
                            $("#rsb-map-container").append(
                                '<i class="fa fa-map-marker rsb-markers" id="rsb-marker-' + postalCode + '"></i>'
                            );
                        }
                    }

                    // Remove all pin datas when user hover pin or land
                    $("#rsb-map-marker-datas").remove();

                    // Add structure corresponding to HTML structure of new pin datas
                    $("#rsb-map-container").append(result.structure);

                    /* ------------------------------------------------------------------------- */
                    /* -------------------------- Biobanks number ------------------------------ */
                    /* ------------------------------------------------------------------------- */

                    // Update text : "Biosample répertorie X Biobanques"
                    $("#map-nb-biobanks > span.rsb-value").text(result.arrayMapDatas["nbBiobank"]);
                    if(result.arrayMapDatas["nbBiobank"] <= 1){
                        $("#map-nb-biobanks > span.rsb-conjug").text(" Biobanque");
                    }else{
                        $("#map-nb-biobanks > span.rsb-conjug").text(" Biobanques");
                    }

                    /* ------------------------------------------------------------------------- */
                    /* ------------------------- Collections number ---------------------------- */
                    /* ------------------------------------------------------------------------- */

                    // Update text : "Comprenant X collections"
                    $("#map-nb-collections > span.rsb-value").text(result.arrayMapDatas["nbCollections"]);
                    if(result.arrayMapDatas["nbCollections"] <= 1){
                        $("#map-nb-collections > span.rsb-conjug").text(" collection");
                    }else{
                        $("#map-nb-collections > span.rsb-conjug").text(" collections");
                    }

                    /* ------------------------------------------------------------------------- */
                    /* --------------------------- Individus number ------------------------------ */
                    /* ------------------------------------------------------------------------- */

                    // Update text : "Soit X individus"
                    $("#map-nb-individus > span.rsb-value").text(result.arrayMapDatas["nbIndividus"]);
                    if(result.arrayMapDatas["nbIndividus"] <= 1){
                        $("#map-nb-individus > span.rsb-conjug").text(" individu");
                    }else{
                        $("#map-nb-individus > span.rsb-conjug").text(" individus");
                    }

                    /* ------------------------------------------------------------------------- */
                    /* --------------------------- Samples number ------------------------------ */
                    /* ------------------------------------------------------------------------- */

                    // Update text : "Et X échantillons"
                    $("#map-nb-samples > span.rsb-value").text(result.arrayMapDatas["nbSample"]);
                    if(result.arrayMapDatas["nbSample"] <= 1){
                        $("#map-nb-samples > span.rsb-conjug").text(" échantillon");
                    }else{
                        $("#map-nb-samples > span.rsb-conjug").text(" échantillons");
                    }

                    /* ------------------------------------------------------------------------- */
                    /* ------------------------- Departments number ---------------------------- */
                    /* ------------------------------------------------------------------------- */

                    // Update text : "Réparties sur X départements"
                    $("#map-nb-departments > span.rsb-value").text(result.arrayMapDatas["nbDepartments"]);
                    if(result.arrayMapDatas["nbDepartments"] <= 1){
                        $("#map-nb-departments > span.rsb-conjug").text(" département");
                    }else{
                        $("#map-nb-departments > span.rsb-conjug").text(" départements");
                    }

                    Drupal.behaviors.bs_rsb_map.attach();
                }

            });
        // }

    };

    Drupal.behaviors.bs_rsb_map.attach = function(context) {

        // Remove page title
        $(".page-title-wrap").remove();

        // If user account menu is visble, set the map lower
        if($("#block-bsconnexion-user-client-account-menu").is(":Visible")){
            $("#block-bs-rsb-ressources-bio-map").css("margin-top", $("#block-bsconnexion-user-client-account-menu").height());
        }

        var tabIledeFrance = [75, 77, 78, 91, 92, 93, 94, 95];
        // var tabDepartmentNumbers = [];

        retrieveDepartmentNumbers();

        function retrieveDepartmentNumbers(){

            tabDepartmentNumbers = [];

            // Set every Markers in the tab
            $(".rsb-markers").each(function(){

                var depNb = $(this).attr('id').split('rsb-marker-')[1];

                tabDepartmentNumbers.push(depNb);
            });

            // Set a delay to execute markersPositionning function
            setTimeout(markersPositionning, 1000);
        }

        // Markers position
        function markersPositionning() {

            $("i.rsb-markers").each(function () {
                // Id of the Marker without the #
                var nameMarker = $(this).attr("id");

                // Id of the Marker
                var idMarker = "#" + nameMarker;

                // Split the nameMarker to retrieve only the number
                var nbMarkerSplit = nameMarker.split("-")[2];

                // Create the class of the path according to the departement
                var classPath = ".departement" + nbMarkerSplit;

                if(
                    nbMarkerSplit == "75" ||
                    nbMarkerSplit == "77" ||
                    nbMarkerSplit == "78" ||
                    nbMarkerSplit == "91" ||
                    nbMarkerSplit == "92" ||
                    nbMarkerSplit == "93" ||
                    nbMarkerSplit == "94" ||
                    nbMarkerSplit == "95"
                ){
                    // Set the Marker at the middle of 'Ile-de-France'
                    $(idMarker).css({
                        "top": $(".departement75").position().top + ($(".departement75")[0].getBoundingClientRect().height / 2) - $(idMarker).height(),
                        "left": $(".departement75").position().left + ($(".departement75")[0].getBoundingClientRect().width / 2) - $(idMarker).width() / 2
                    });
                }
                else{
                    // Set the Marker at the right position on the map
                    $(idMarker).css({
                        "top": $(classPath).position().top + ($(classPath)[0].getBoundingClientRect().height / 2) - $(idMarker).height(),
                        "left": $(classPath).position().left + ($(classPath)[0].getBoundingClientRect().width / 2) - $(idMarker).width() / 2
                    });
                }

                // Animate the appeareance of Marker
                // $(idMarker).animate({
                //     opacity: "toggle"
                // }, 500);
                $(idMarker).show();
            });
        }

        function displayDatas(numberDepartment, isEnter){

            /*
             * isEnter : Boolean
             * If isEnter is true : mouseenter
             * If isEnter is false : mouseleave
             */

            for(var i = 0; i < tabDepartmentNumbers.length ; i++) {

                if (numberDepartment == tabDepartmentNumbers[i]) {

                    if(isEnter){

                        // $("#rsb-map-marker-datas").toggle();
                        $("#rsb-map-marker-datas").show();

                        // $("#dpt-"+numberDepartment).toggle();
                        $("#dpt-"+numberDepartment).show();
                    }else{

                        $("#rsb-map-marker-datas").hide();

                        $("#dpt-"+numberDepartment).hide();
                    }
                }
            }

            for (var j = 0; j < tabIledeFrance.length; j++){

                if (
                    numberDepartment == tabIledeFrance[j] &&
                    numberDepartment == tabDepartmentNumbers[i]
                ) {

                    if(isEnter){

                        $("#rsb-map-marker-datas").show();

                        for (var k = 0; k < tabIledeFrance.length; k++) {
                            $("#dpt-" + tabIledeFrance[k]).show();
                        }
                    }else{

                        $("#rsb-map-marker-datas").hide();

                        for (var k = 0; k < tabIledeFrance.length; k++) {
                            $("#dpt-" + tabIledeFrance[k]).hide();
                        }
                    }
                }
            }
        }

        function changeAppearance(numberDepartment, fillColor, colorColor){

            var isIleDeFrance = false;

            // Browse tabIledeFrance
            for( var k = 0 ; k < tabIledeFrance.length ; k++ ){

                // Check if the department hovered is in Ile de France
                if( numberDepartment === tabIledeFrance[k] ){

                    // Set boolean to true
                    isIleDeFrance = true;
                }
            }

            // If it's in Ile de France
            if(isIleDeFrance){

                var isPinOnDepartment = false;

                for(var n = 0 ; n < tabDepartmentNumbers.length ; n++){

                    for(var v = 0 ; v < tabIledeFrance.length ; v++){

                        if( tabIledeFrance[v] == tabDepartmentNumbers[n] ){

                            isPinOnDepartment = true;
                        }
                    }
                }

                if(isPinOnDepartment){

                    // Change appearance of the Ile-de-France and its Marker
                    for(var j = 0; j < tabIledeFrance.length ; j++) {
                        $(".departement" + tabIledeFrance[j]).css("fill", fillColor);
                        $("#rsb-marker-" + tabIledeFrance[j]).css("color", colorColor);
                    }
                }

            }else{

                // Browse tabDepartmentNumbers
                for( var l = 0 ; l < tabDepartmentNumbers.length ; l++ ){

                    // Check if the department hovered contain a pin
                    if ( numberDepartment === tabDepartmentNumbers[l] ) {

                        var isInIleDeFrance = false;

                        // Browse tabIledeFrance
                        for( var m = 0 ; m < tabIledeFrance.length ; m++ ){

                            // Check if the department hovered is in Ile de France
                            if( numberDepartment == tabIledeFrance[m] ){

                                // If it is, set boolean to true
                                isInIleDeFrance = true;
                            }
                        }

                        // If the department hovered is not in Ile de France
                        if( !isInIleDeFrance ){

                            // Change appearance of the department hovered and its marker
                            $("#rsb-marker-" + numberDepartment).css("color", colorColor);
                            $(".departement" + numberDepartment).css("fill", fillColor);
                        }else{

                            // If the department hovered is in Ile de France

                            // Change appearance of the Ile-de-France and its Marker
                            for(var j = 0; j < tabIledeFrance.length ; j++) {
                                $(".departement" + tabIledeFrance[j]).css("fill", fillColor);
                                $("#rsb-marker-" + tabIledeFrance[j]).css("color", colorColor);
                            }
                        }
                    }
                }
            }
        }

        // Hover on lands
        $(".land").mouseenter(function(){

            // Boolean to check if department number hovered is into Ile de France
            var isIleDeFrance = null;

            // Retrieve and stock the department number of the land
            var numberDepartment = $(this).attr("class").split("land departement")[1];

            // Check if the land hovered is contained in the array Ile de France
            for(var i=0 ; i < tabIledeFrance.length ; i++){

                if(numberDepartment == tabIledeFrance[i]){

                    // Set boolean to true
                    isIleDeFrance = true;
                }
            }

            // Set colors
            var fillColor = "#FFCDD2";
            var colorColor = "#D32F2F";

            // If department hovered is in Ile de France
            if( isIleDeFrance ) {

                // Call both functions for each department contained into Ile de France array
                for (var j = 0; j < tabIledeFrance.length; j++) {

                    numberDepartment = tabIledeFrance[j];

                    // Call changeAppearance function
                    changeAppearance(numberDepartment, fillColor, colorColor);

                    displayDatas(numberDepartment, true);
                }
            }else {
                // Call changeAppearance function
                changeAppearance(numberDepartment, fillColor, colorColor);

                displayDatas(numberDepartment, true);
            }
        });

        $(".land").mouseleave(function(){

            // Boolean to check if department number hovered is into Ile de France
            var isIleDeFrance = null;

            // Retrieve and stock the department number of the land hovered
            var numberDepartment = $(this).attr("class").split("land departement")[1];

            // Check if the land hovered is contained in the array Ile de France
            for(var i=0 ; i < tabIledeFrance.length ; i++){

                if(numberDepartment == tabIledeFrance[i]){

                    // Set boolean to true
                    isIleDeFrance = true;
                }
            }

            // Set colors
            var fillColor = "#EDEFEF";
            var colorColor = "#1e6a8e";

            // If department hovered is in Ile de France
            if( isIleDeFrance ) {

                // Call both functions for each department contained into Ile de France array
                for (var j = 0; j < tabIledeFrance.length; j++) {

                    numberDepartment = tabIledeFrance[j];

                    // Call changeAppearance function
                    changeAppearance(numberDepartment, fillColor, colorColor);

                    displayDatas(numberDepartment, false);
                }
            }else {
                // Call changeAppearance function
                changeAppearance(numberDepartment, fillColor, colorColor);

                displayDatas(numberDepartment, false);
            }
        });

        // Hover on markers
        $("body").on("mouseenter", "i.rsb-markers", function(){

            // Retrieve and stock the department number of the Marker
            var numberDepartment = $(this).attr("id").split("rsb-marker-")[1];

            // Set colors
            var fillColor = "#FFCDD2";
            var colorColor = "#D32F2F";

            // Call changeAppearance function
            changeAppearance(numberDepartment, fillColor, colorColor);

            displayDatas(numberDepartment, true);
        });

        $("body").on("mouseleave", "i.rsb-markers", function(){

            // Retrieve and stock the department number of the Marker
            var numberDepartment = $(this).attr("id").split("rsb-marker-")[1];

            // Set colors
            var fillColor = "#EDEFEF";
            var colorColor = "#1e6a8e";

            // Call changeAppearance function
            changeAppearance(numberDepartment, fillColor, colorColor);

            displayDatas(numberDepartment, false);
        });


        // Change appearance the text at the bottom when hovered
        $("#rsb-map-bottom *").mouseenter(function(){
            $("#rsb-map-bottom *").css("color", "#1e6a8e");
        });
        $("#rsb-map-bottom *").mouseleave(function(){
            $("#rsb-map-bottom *").css("color", "#fff");
        });

        // Smooth Scrolling
        $("#rsb-map-bottom > a").on('click', function(event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll and it takes 800 ms
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    // window.location.hash = hash;
                    window.location.hash = "collections";
                });
            }
        });

        // Blur the block after a delay
        // setTimeout(blurRsb, 4000);
        //
        // function blurRsb(){
        //     $( "#block-bs-rsb-ressources-bio-map" ).css("filter", "blur(5px)");
        //     $( "#block-bs-rsb-ressources-bio-collections" ).css("filter", "blur(5px)");
        //     $( "#block-views-rb-collections-block" ).css("filter", "blur(5px)");
        //     $( "#block-bs-rsb-ressources-bio-filtres" ).css("filter", "blur(5px)");
        //
        //     $("body").append("<div id='bs-rsb-popup'>" +
        //         "<p>Nous travaillons actuellement sur cette plateforme.</p>" +
        //         "<p>N'hésitez pas à nous suivre sur " +
        //         "<a href='https://www.facebook.com/BioSample/' target='_blank'>Facebook</a>" +
        //         " pour rester informé des évolutions !</p>" +
        //         "</div>");
        // }

        $("body").on("click", "#sf-result-consult", function(){

            // Call getNumberFiltersSelected function
            // getNumberFiltersSelected();
            setTimeout(Drupal.behaviors.bs_rsb_map.getNumberFiltersSelected,500);
        });

        /* User choose which result he wants to see */
        $("body").on("click", "#ofc-requirement-filters-results", function(){

            if($("#ofc-requirement-filters-results i").is(":visible")){

                // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
                setTimeout(Drupal.behaviors.bs_rsb_map.getNumberFiltersSelected,500);
            }
        });

        $("body").on("click", "#ofc-filters-results", function(){

            if($("#ofc-filters-results i").is(":visible")){

                // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
                setTimeout(Drupal.behaviors.bs_rsb_map.getNumberFiltersSelected,500);
            }
        });

        /* ---------------------------------------------------------------------------------- */
        /* ------------------------------- Cross : On Click --------------------------------- */
        /* ---------------------------------------------------------------------------------- */

        // When user click on the overlay's cross : Overlay containing filters disappear
        $("body").on('click', 'i#ofc-remove', function(){

            // Call getNumberFiltersSelected function
            // getNumberFiltersSelected();
            setTimeout(Drupal.behaviors.bs_rsb_map.getNumberFiltersSelected,500);
        });

        /* ---------------------------------------------------------------------------------- */
        /* ----------------------- Reinit all filters : On Click ---------------------------- */
        /* ---------------------------------------------------------------------------------- */

        // When user click on reinitialize all filters button
        $("body").on('click', '#reinit-all-filters', function(){

            // Call getNumberFiltersSelected function
            // getNumberFiltersSelected();
            setTimeout(Drupal.behaviors.bs_rsb_map.getNumberFiltersSelected,500);
        });


        // Drupal.behaviors.bs_rsb_map.getNumberFiltersSelected();

        // function getNumberFiltersSelected(){
        //
        //     /* ------------------------------------------------------------------------- */
        //     /* ---------------------- Filters selected number -------------------------- */
        //     /* ------------------------------------------------------------------------- */
        //
        //     // Initialize numberFiltersSelected that would allow to get number of filters
        //     var numberFiltersSelected = 0;
        //
        //     // Browse into session
        //     for(var s = 0 ; s < sessionStorage.length ; s++){
        //
        //         // Check if the value of the filter isn't "indifferent"
        //         if( sessionStorage.getItem(Object.keys(sessionStorage)[s]) !== "indifferent" ){
        //
        //             // Increment numberFiltersSelected
        //             numberFiltersSelected++;
        //         }
        //     }
        //
        //     // Update text : "répondant(s) au(x)  X critère(s) séléctionné(s)"
        //     $("#special-filters-infos-map > span.rsb-value").text(numberFiltersSelected);
        //
        //     /* ------------------------------------------------------------------------- */
        //     /* --------------------------- Pins on the map ----------------------------- */
        //     /* ------------------------------------------------------------------------- */
        //
        //     // Init array intended to contain node ID
        //     var arrayNodeID = [];
        //
        //     // Browse every collection card
        //     $(".view-rb-collections .node-rb-collections").each(function(){
        //
        //         // If it's visible
        //         if( $(this).is(":visible") ){
        //
        //             // Retrive the ID and split to get exclusively the node ID
        //             var nodeID = $(this).attr('id');
        //             nodeID = nodeID.split('article-')[1];
        //
        //             // Push node ID into array
        //             arrayNodeID.push(nodeID);
        //         }
        //     });
        //
        //     // Ajax request
        //     var datas = {
        //         node_ID: arrayNodeID
        //     };
        //
        //     $.ajax({
        //         url: Drupal.settings.basePath + 'ressources-biologiques/home/pins',
        //         dataType: 'json',
        //         type: 'GET',
        //         data: datas,
        //         success: function (result) {
        //
        //             // Remove every markers on the map
        //             $(".rsb-markers").each(function(){
        //                 $(this).remove();
        //             });
        //
        //             for(var i = 0 ; i < result.arrayResultsPostalCode.length ; i++){
        //
        //                 // Get postal code and split to retrieve exclusively the two first chars
        //                 var postalCode = result.arrayResultsPostalCode[i];
        //                 postalCode = postalCode.toString().slice(0, 2);
        //
        //                 // Boolean to verify if pin is set or not
        //                 var isPinExist = false;
        //                 // Browse every marker
        //                 $(".rsb-markers").each(function(){
        //
        //                     // If the pin is already implement, set boolean to true
        //                     if( $(this).attr('id') === ("rsb-marker-" + postalCode) ){
        //                         isPinExist = true;
        //                     }
        //                 });
        //
        //                 // If pin isn't set
        //                 if( isPinExist === false ){
        //
        //                     // Append the pin on the map
        //                     $("#rsb-map-container").append(
        //                         '<i class="fa fa-map-marker rsb-markers" id="rsb-marker-' + postalCode + '"></i>'
        //                     );
        //                 }
        //             }
        //
        //             // Remove all pin datas when user hover pin or land
        //             $("#rsb-map-marker-datas").remove();
        //
        //             // Add structure corresponding to HTML structure of new pin datas
        //             $("#rsb-map-container").append(result.structure);
        //
        //             /* ------------------------------------------------------------------------- */
        //             /* -------------------------- Biobanks number ------------------------------ */
        //             /* ------------------------------------------------------------------------- */
        //
        //             // Update text : "Biosample répertorie X Biobanques"
        //             $("#map-nb-biobanks > span.rsb-value").text(result.arrayMapDatas["nbBiobank"]);
        //             if(result.arrayMapDatas["nbBiobank"] <= 1){
        //                 $("#map-nb-biobanks > span.rsb-conjug").text(" Biobanque");
        //             }else{
        //                 $("#map-nb-biobanks > span.rsb-conjug").text(" Biobanques");
        //             }
        //
        //             /* ------------------------------------------------------------------------- */
        //             /* ------------------------- Collections number ---------------------------- */
        //             /* ------------------------------------------------------------------------- */
        //
        //             // Update text : "Comprenant X collections"
        //             $("#map-nb-collections > span.rsb-value").text(result.arrayMapDatas["nbCollections"]);
        //             if(result.arrayMapDatas["nbCollections"] <= 1){
        //                 $("#map-nb-collections > span.rsb-conjug").text(" collection");
        //             }else{
        //                 $("#map-nb-collections > span.rsb-conjug").text(" collections");
        //             }
        //
        //             /* ------------------------------------------------------------------------- */
        //             /* --------------------------- Individus number ------------------------------ */
        //             /* ------------------------------------------------------------------------- */
        //
        //             // Update text : "Soit X individus"
        //             $("#map-nb-individus > span.rsb-value").text(result.arrayMapDatas["nbIndividus"]);
        //             if(result.arrayMapDatas["nbIndividus"] <= 1){
        //                 $("#map-nb-individus > span.rsb-conjug").text(" individu");
        //             }else{
        //                 $("#map-nb-individus > span.rsb-conjug").text(" individus");
        //             }
        //
        //             /* ------------------------------------------------------------------------- */
        //             /* --------------------------- Samples number ------------------------------ */
        //             /* ------------------------------------------------------------------------- */
        //
        //             // Update text : "Et X échantillons"
        //             $("#map-nb-samples > span.rsb-value").text(result.arrayMapDatas["nbSample"]);
        //             if(result.arrayMapDatas["nbSample"] <= 1){
        //                 $("#map-nb-samples > span.rsb-conjug").text(" échantillon");
        //             }else{
        //                 $("#map-nb-samples > span.rsb-conjug").text(" échantillons");
        //             }
        //
        //             /* ------------------------------------------------------------------------- */
        //             /* ------------------------- Departments number ---------------------------- */
        //             /* ------------------------------------------------------------------------- */
        //
        //             // Update text : "Réparties sur X départements"
        //             $("#map-nb-departments > span.rsb-value").text(result.arrayMapDatas["nbDepartments"]);
        //             if(result.arrayMapDatas["nbDepartments"] <= 1){
        //                 $("#map-nb-departments > span.rsb-conjug").text(" département");
        //             }else{
        //                 $("#map-nb-departments > span.rsb-conjug").text(" départements");
        //             }
        //
        //         }
        //     });
        //
        //     setTimeout(retrieveDepartmentNumbers, 1000);
        // }

    }
}(jQuery));