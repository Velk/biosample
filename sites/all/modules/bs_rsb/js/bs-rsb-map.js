(function ($) {
    Drupal.behaviors.bs_rsb_map = {
        attach: function (context, settings) {

            // Remove page title
            $(".page-title-wrap").remove();

            // If user account menu is visble, set the map lower
            if($("#block-bsconnexion-user-client-account-menu").is(":Visible")){
                $("#block-bs-rsb-ressources-bio-map").css("margin-top", $("#block-bsconnexion-user-client-account-menu").height());
            }

            var tabIledeFrance = [75, 77, 78, 91, 92, 93, 94, 95];

            retrieveDepartmentNumbers();

            var tabDepartmentNumbers = [];
            var tabNumbMax = null;

            function retrieveDepartmentNumbers(){
                tabNumbMax = null;
                tabDepartmentNumbers = [];

                // Set every Markers in the tab
                $(".rsb-markers").each(function(){
                    var depNb = $(this).attr('id').split('rsb-marker-')[1];

                    tabDepartmentNumbers.push(depNb);
                });

                // Browse into the tabIledeFrance
                // for(var w=0 ; w < tabIledeFrance.length ; w++){
                //
                //     // Browse into the tabDepartmentNumbers
                //     for(var v=0 ; v < tabDepartmentNumbers.length ; v++){
                //
                //         // If the value of tabDepartmentNumber is inside the tabIledeFrance
                //         if(tabDepartmentNumbers[v] == tabIledeFrance[w]){
                //
                //             // Remove the element
                //             // tabDepartmentNumbers.splice(v,1);
                //         }
                //     }
                // }

                // Compare 2 arrays
                // Stock the number max of elements
                tabNumbMax = tabIledeFrance.length > tabDepartmentNumbers.length ? tabIledeFrance.length : tabDepartmentNumbers.length;

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

            function displayDatas(numberDepartment){

                for(var i = 0; i < tabDepartmentNumbers.length ; i++) {

                    if (numberDepartment == tabDepartmentNumbers[i]) {

                        $("#rsb-map-marker-datas").toggle();

                        $("#dpt-"+numberDepartment).toggle();
                    }
                }

                for (var j = 0; j < tabIledeFrance.length; j++){

                    if (
                        numberDepartment == tabIledeFrance[j] &&
                        numberDepartment == tabDepartmentNumbers[i]
                    ) {

                        $("#rsb-map-marker-datas").toggle();

                        for (var k = 0; k < tabIledeFrance.length; k++) {
                            $("#dpt-" + tabIledeFrance[k]).toggle();
                        }
                    }
                }
            }

            function changeAppearance(numberDepartment, fillColor, colorColor){

                // Loop through the tabIledeFrance containing departments of Ile-de-France
                for(var i=0; i<tabNumbMax; i++){

                    // If the department hovered is in tabIledeFrance
                    if(
                        numberDepartment == tabIledeFrance[i] &&
                        numberDepartment == tabDepartmentNumbers[i]
                    ){

                        // Change appearance of the Ile-de-France and its Marker
                        for(var j=0; j<tabIledeFrance.length; j++) {
                            $(".departement" + tabIledeFrance[j]).css("fill", fillColor);
                            $("#rsb-marker-" + tabIledeFrance[j]).css("color", colorColor);
                        }

                    }
                    else if(numberDepartment == tabDepartmentNumbers[i]){

                        // Change appearance of the department hovered and its marker
                        $("#rsb-marker-" + numberDepartment).css("color", colorColor);
                        $(".departement" + numberDepartment).css("fill", fillColor);
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

                        displayDatas(numberDepartment);
                    }
                }else {
                    // Call changeAppearance function
                    changeAppearance(numberDepartment, fillColor, colorColor);

                    displayDatas(numberDepartment);
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

                        displayDatas(numberDepartment);
                    }
                }else {
                    // Call changeAppearance function
                    changeAppearance(numberDepartment, fillColor, colorColor);

                    displayDatas(numberDepartment);
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

                displayDatas(numberDepartment);
            });

            $("body").on("mouseleave", "i.rsb-markers", function(){

                // Retrieve and stock the department number of the Marker
                var numberDepartment = $(this).attr("id").split("rsb-marker-")[1];

                // Set colors
                var fillColor = "#EDEFEF";
                var colorColor = "#1e6a8e";

                // Call changeAppearance function
                changeAppearance(numberDepartment, fillColor, colorColor);

                displayDatas(numberDepartment);
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

            // Call getNumberFiltersSelected function
            getNumberFiltersSelected();

            $("body").on("click", "#sf-result-consult", function(){

                // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
                setTimeout(getNumberFiltersSelected,500);
            });

            /* User choose which result he wants to see */
            $("body").on("click", "#ofc-requirement-filters-results", function(){

                if($("#ofc-requirement-filters-results i").is(":visible")){

                    // Call getNumberFiltersSelected function
                    // getNumberFiltersSelected();
                    setTimeout(getNumberFiltersSelected,500);
                }
            });

            $("body").on("click", "#ofc-filters-results", function(){

                if($("#ofc-filters-results i").is(":visible")){

                    // Call getNumberFiltersSelected function
                    // getNumberFiltersSelected();
                    setTimeout(getNumberFiltersSelected,500);
                }
            });

            /* ---------------------------------------------------------------------------------- */
            /* ------------------------------- Cross : On Click --------------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // When user click on the overlay's cross : Overlay containing filters disappear
            $("body").on('click', 'i#ofc-remove', function(){

                // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
                setTimeout(getNumberFiltersSelected,500);
            });

            /* ---------------------------------------------------------------------------------- */
            /* ----------------------- Reinit all filters : On Click ---------------------------- */
            /* ---------------------------------------------------------------------------------- */

            // When user click on reinitialize all filters button
            $("body").on('click', '#reinit-all-filters', function(){

                // Call getNumberFiltersSelected function
                // getNumberFiltersSelected();
                setTimeout(getNumberFiltersSelected,500);
            });

            function getNumberFiltersSelected(){

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

                        // Remove every markers on the map
                        $(".rsb-markers").each(function(){
                            $(this).remove();
                        });

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

                    }
                });

                setTimeout(retrieveDepartmentNumbers, 1000);
            }

        }
    };
}(jQuery));