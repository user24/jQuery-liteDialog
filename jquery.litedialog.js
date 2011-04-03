/* jquery bringToFront plugin. based on http://www.west-wind.com/weblog/posts/876332.aspx */
(function( $ ){
    $.fn.bringToFront = function() {
        var zmax = 0;
        $('*').each(function() {
            var cur = parseInt($(this).css('z-index'));
            zmax = cur > zmax ? cur : zmax;
        });
        return this.each(function() {
            $(this).css("z-index", ++zmax);
        });
    }
})( jQuery );
/* / bringToFront */

/* liteDialog by Howard Yeend, developed for Twist Digital Media */
/* Basic usage: to show: $.liteDialog({'html':'Dialog contents here'}); */
/*        to hide: $.liteDialog('hide'); */
/* more at puremango.co.uk and source available at https://github.com/user24/jQuery-liteDialog */
(function( $ ){
    function escapeHitHide(e) {
        if(e.keyCode == 27) {
            $.liteDialog('hide');
        }
    }
    // prefix elements to avoid dom conflicts.
    var prefix = 'hyLite';
    var methods = {
        init : function(options) {
            var settings = {
                'html'          : 'liteDialog',
                'modal'         : false,
                'shadow'        : '#000000',
                'borderRadius'  : '25px',
                'background'    : '#FFFFFF',
                'color'         : '#000000',
                'width'         : '300px',
                'padding'       : '10px'
            };
            
            // If options have been sent, merge with our default settings
            if(options) {
              $.extend(settings, options);
            }
            
            // create shadow if not already added to DOM
            if($('#'+prefix+'shadow').length == 0) {
                $("<div id='"+prefix+"shadow' style='position:fixed;top:0;left:0;'>").hide().bringToFront().css({
                    "height"    : $(document).height(),
                    "width"     : $(document).width()
                }).appendTo(document.body);
            }
            
            // create dialog if not already added to DOM
            if($('#'+prefix+'dialog').length == 0) {
                $("<div id='"+prefix+"dialog' style='position:absolute;'>").hide().bringToFront().appendTo(document.body);
            }
            
            // fade shadow in (i.e. fade page out to black). Settings could vary with each call, so we set the CSS here not on element creation.
            $('#'+prefix+'shadow').css('background',settings.shadow).fadeTo('fast',0.4);
            
            // fade dialog in, centered on page.
            $('#'+prefix+'dialog').html(settings.html).width(settings.width).css({
                'box-shadow'          : '0px 0px '+settings.borderRadius+' '+settings.shadow,
                '-moz-box-shadow'     : '0px 0px '+settings.borderRadius+' '+settings.shadow,
                '-webkit-box-shadow'  : '0px 0px '+settings.borderRadius+' '+settings.shadow,
                'color'               : settings.color,
                'background'          : settings.background,
                'padding'             : settings.padding,
                'top'                 : ($(window).height() - $('#'+prefix+'dialog').outerHeight()) / 2 + $(window).scrollTop(),
                'left'                : ($(window).width() - $('#'+prefix+'dialog').outerWidth()) / 2 + $(window).scrollLeft()
            }).fadeIn();
            
            if(!settings.modal) {
              // hit ESC or click anywhere to dismiss if not modal    
              $('#'+prefix+'shadow, #'+prefix+'dialog').click(function() {
                $.liteDialog('hide');
              });
              $(document).keyup(escapeHitHide);
            } else {
              // remove handlers that may have been present from previously shown dialogs
              $('#'+prefix+'shadow, #'+prefix+'dialog').unbind();
              $(document).unbind("keyup", escapeHitHide);
            }
        },
        hide : function() {
            $('#'+prefix+'shadow, #'+prefix+'dialog').fadeOut();
        }
    };
    $.liteDialog = $.fn.liteDialog = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.liteDialog' );
        }
    };
})( jQuery );
/* /liteDialog */