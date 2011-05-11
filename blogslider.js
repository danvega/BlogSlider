/*
 * BlogSlider v 1.0 
 * 
 * Author: Daniel Vega
 * Description: Demo jQuery plugin for cfObjective 2011
 */
(function( $ ){
	
	// PUBLIC FUNCTION ADDED TO THE jQuery.fn Object
	$.fn.blogslider = function( options ) {

		var timer = null,
			aboutEnabled = false,
			
			// override settings with passed parameters
			settings  = $.extend( {}, $.fn.blogslider.defaults, options ),
			
			blogs     = this.find( ".blog" ),
			menuItems = this.find( "#bsnavigation li"),
			hideme    = this.find( ".hideme" ),
			about     = this.find( ".about" );
		
		// show first blog
		blogs.first().addClass( "current" ).show();
		
		// add the active class to the first navigation item
		menuItems.first().addClass('active');
		
		// NAVIGATION ITEMS CLICK EVENT
		this.delegate( "#bsnavigation li", 'click', function(e){
			e.preventDefault();
			
			var thisMenuItem = $( this ),
				image = thisMenuItem.find('a').attr("href"),
				blog = blogs.find("img[src='" + image + "']").closest('.blog');
			
			// hide all the blogs and
			// fade in the current one
			blogs.not( blog ).hide();
			blog.fadeIn();
			
			// Deselect previou menu, and
			// select active menu
			menuItems.not( thisMenuItem ).removeClass('active');
			thisMenuItem.addClass('active');
			
			if ( e.originalEvent ) {
				// If the user clicked the menu item, then cancel autoPlay
				clearInterval(timer);
			}
		});
		
		
		// SHOW/HIDE ABOUT	
		hideme.click(function(e){
			aboutEnabled = !aboutEnabled;
			
			about[ aboutEnabled ? "slideUp" : "slideDown"]();
			hideme.html( aboutEnabled ? "Show Description" : "Hide Description" );
			
			e.preventDefault();
		});	
		
		
		// AUTO PLAY
		if( settings.autoPlay ) {
			timer = setInterval(function(){
				var $next = menuItems.filter(".active").next();
				
				if ( !$next.length ) {
					$next = menuItems.eq(0);
				};
				
				// Reuse the click event to
				// keep code duplication to a minimum
				$next.click();
			}, settings.slideDelay );
		}
		
		return this;
	};
	
	$.fn.blogslider.defaults = {
		autoPlay: true,
		slideDelay: 3000
	};
		
	// PRIVATE METHODS
	function trace(o){
		if (this.console && typeof console.log != "undefined") {
			console.log(o);
		}
	}
	
})( jQuery );

