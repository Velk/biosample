// (function ($) {
//     Drupal.behaviors.bs_cc_cataloguep = {
//         attach: function (context, settings) {
//
//             $("#cp-search").bind('input', function(){
//                 console.log($("#cp-search").val());
//
//                 $(".cp-reference").each(function(){
//                     $(this).parent().hide();
//                     // console.log($.trim($(this).text()));
//                     // console.log($("#cp-search").val());
//
//                     if($.trim($(this).text()) == $("#cp-search").val()){
//                         $(this).parent().show();
//
//                     }
//                 });
//             });
//
//         }
//     };
// }(jQuery));