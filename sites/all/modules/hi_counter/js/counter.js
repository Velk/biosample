(function ($) {
    Drupal.behaviors.hi_counter = {
        attach: function (context, settings) {
            var ajax_call = function() {
                $.getJSON( Drupal.settings.master + "/counter/data/" + Drupal.settings.reference + "?callback=?", function(data) {
                    var nb = data.count;
                    var result_pourcent = 100 * (nb) / Drupal.settings.target
                    progressLabel = $( ".progress-label" );
                    $( ".progressbar" ).progressbar({
                        value: result_pourcent
                    });
                    progressLabel.text(addThousandSeparator(nb));
                });

                function addThousandSeparator(nStr) {
                    nStr += '';
                    var x = nStr.split('.');
                    var x1 = x[0];
                    var x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
                    }
                    return x1 + x2;
                }
            };

            // First call
            ajax_call();

            // Next call every X minutes
            var milisecondes = 1000;
            var secondes = 60;
            var minutes = 5;
            var interval = milisecondes * secondes * minutes;

            setInterval(ajax_call, interval);
        }
    };
}(jQuery));
