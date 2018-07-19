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

            var tabDepartmentNumbers = [];

            // Set every Markers in the tab
            $(".rsb-markers").each(function(){
                var depNb = $(this).attr('id').split('rsb-marker-')[1];

                tabDepartmentNumbers.push(depNb);
            });

            // Browse into the tabIledeFrance
            for(var w=0 ; w < tabIledeFrance.length ; w++){

                // Browse into the tabDepartmentNumbers
                for(var v=0 ; v < tabDepartmentNumbers.length ; v++){

                    // If the value of tabDepartmentNumber is inside the tabIledeFrance
                    if(tabDepartmentNumbers[v] == tabIledeFrance[w]){

                        // Remove the element
                        tabDepartmentNumbers.splice(v,1);
                    }
                }
            }

            // Compare 2 arrays
            // Stock the number max of elements
            var tabNumbMax = tabIledeFrance.length > tabDepartmentNumbers.length ? tabIledeFrance.length : tabDepartmentNumbers.length;

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
                    $(idMarker).animate({
                        opacity: "toggle"
                    }, 500);
                });
            }

            // Set a delay to execute markersPositionning function
            setTimeout(markersPositionning, 500);



            function displayDatas(numberDepartment){

                for(var i = 0; i < tabDepartmentNumbers.length ; i++) {

                    if (numberDepartment == tabDepartmentNumbers[i]) {
                        // console.log("PAS IDF");

                        $("#rsb-map-marker-datas").toggle();

                        $("#dpt-"+numberDepartment).toggle();
                    }
                }

                for (var j = 0; j < tabIledeFrance.length; j++){

                    if (numberDepartment == tabIledeFrance[j]) {
                        // console.log("IDF");

                        $("#rsb-map-marker-datas").toggle();
                        // $("#rsb-map-marker-datas").animate({
                        //     opacity: "1",
                        // }, 500);

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
                    if(numberDepartment == tabIledeFrance[i]){

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

                // Retrieve and stock the department number of the land
                var numberDepartment = $(this).attr("class").split("land departement")[1];

                // Set colors
                var fillColor = "#FFCDD2";
                var colorColor = "#D32F2F";

                // Call changeAppearance function
                changeAppearance(numberDepartment, fillColor, colorColor);

                displayDatas(numberDepartment);
            });

            $(".land").mouseleave(function(){

                // Retrieve and stock the department number of the land
                var numberDepartment = $(this).attr("class").split("land departement")[1];

                // Set colors
                var fillColor = "#EDEFEF";
                var colorColor = "#1e6a8e";

                // Call changeAppearance function
                changeAppearance(numberDepartment, fillColor, colorColor);

                displayDatas(numberDepartment);
            });

            // Hover on markers
            $(".rsb-markers").mouseenter(function(){

                // Retrieve and stock the department number of the Marker
                var numberDepartment = $(this).attr("id").split("rsb-marker-")[1];

                // Set colors
                var fillColor = "#FFCDD2";
                var colorColor = "#D32F2F";

                // Call changeAppearance function
                changeAppearance(numberDepartment, fillColor, colorColor);

                displayDatas(numberDepartment);
            });

            $(".rsb-markers").mouseleave(function(){

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
        }
    };
}(jQuery));