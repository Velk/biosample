(function ($) {
    $(function () {
        $(".popup").dialog({
            modal: true,
            autoOpen: false,
            // custom close button
            buttons: {
                "X": function () {
                    $(this).dialog("close")
                }
            },
            // for aligning block in center
            my: "center",
            at: "center",
            of: window,
            // effects to show the popup
            show: {
                effect: 'fadeIn',
                duration: 500
            },
            hide: {
                effect: 'fadeOut',
                duration: 500
            }
        });
        // popup on a specific page load
        if (window.location.pathname != ('/test')) {
            $(window).load(function() {
                $('.popup').dialog('open');
            });
        }
        // popup on a button click
        $("button").click(function () {
            $('.popup').dialog('open');
        });
    });
})(jQuery);
