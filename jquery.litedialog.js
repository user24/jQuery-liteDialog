/*jslint browser:true, sloppy:true, devel:true */
/*global jQuery */
/* liteDialog by Howard Yeend, developed for Twist Digital Media */
/* Basic usage: to show: $.liteDialog('Dialog contents here'); */
/* to hide: $.liteDialog('hide'); */
/* more at http://www.puremango.co.uk/2011/04/jquery-simple-dialog/ and source available at https://github.com/user24/jQuery-liteDialog */
(function ($) {
    function escapeHitHide(e) {
        if (e.keyCode === 27) {
            $.liteDialog('hide');
        }
    }
    // prefix element IDs to avoid dom conflicts.
    var prefix = 'hyLite',
        methods = {
            init : function (options) {
                var settings = {
                    'html' : 'liteDialog',
                    'modal' : false,
                    'zIndex' : '9000'
                };

                // If options have been sent, merge with our default settings
                if (options) {
                    $.extend(settings, options);
                }

                // create shadow if not already added to DOM
                if ($('#' + prefix + 'Shadow').length === 0) {
                    $('<div id="' + prefix + 'Shadow" style="position:fixed;top:0;left:0;">').hide().css({
                        'height' : $(document).height(),
                        'width' : $(document).width()
                    }).appendTo(document.body);
                }

                // create dialog if not already added to DOM
                if ($('#' + prefix + 'Dialog').length === 0) {
                    $('<div id="' + prefix + 'Dialog" style="position:absolute;">').hide().appendTo(document.body);
                }

                // fade shadow in (i.e. fade page out to black). Settings could vary with each call, so we set the CSS here not on element creation.
                $('#' + prefix + 'Shadow').css({
                    'background': settings.shadow,
                    'z-index': settings.zIndex
                }).fadeTo('fast', 0.4);

                // fade dialog in, centered on page.
                $('#' + prefix + 'Dialog').html(settings.html).width(settings.width).css({
                    'top': ($(window).height() - $('#' + prefix + 'Dialog').outerHeight()) / 2 + $(window).scrollTop(),
                    'left': ($(window).width() - $('#' + prefix + 'Dialog').outerWidth()) / 2 + $(window).scrollLeft(),
                    'z-index' : settings.zIndex + 1
                }).fadeIn();

                if (!settings.modal) {
                    // hit ESC or click anywhere to dismiss if not modal
                    $('#' + prefix + 'Shadow, #' + prefix + 'Dialog').click(function () {
                        $.liteDialog('hide');
                    });
                    $(document).keyup(escapeHitHide);
                } else {
                    // remove handlers that may have been present from previously shown dialogs
                    $('#' + prefix + 'Shadow, #' + prefix + 'Dialog').unbind();
                    $(document).unbind('keyup', escapeHitHide);
                }
            },
            hide: function () {
                $('#' + prefix + 'Shadow, #' + prefix + 'Dialog').fadeOut();
            }
        };
    $.liteDialog = $.fn.liteDialog = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            return methods.init.apply(this, [{'html': method}]);
        }
    };
}(jQuery));
/* /liteDialog */