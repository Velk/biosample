(function ($) {
    Drupal.behaviors.bs_rsb_establishments = {
        attach: function (context, settings) {

            $(document).ready(function(){

                $(".page-title-wrap").remove();

                $("#presentation > a").on('click', function(event) {

                    // Make sure this.hash has a value before overriding default behavior
                    if (this.hash !== "") {
                        // Prevent default anchor click behavior
                        event.preventDefault();

                        // Store hash
                        var hash = this.hash;

                        // Using jQuery's animate() method to add smooth page scroll and it takes 800 ms
                        $('html, body').animate({
                            scrollTop: $(hash).offset().top - 65
                        }, 800, function(){

                            // Add hash (#) to URL when done scrolling (default click behavior)
                            // window.location.hash = hash;
                            window.location.hash = "autres-collections";
                        });
                    }
                });


            });

        }
    };
}(jQuery));
