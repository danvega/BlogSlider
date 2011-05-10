/*
 * BlogSlider v 1.0 
 * 
 * Author: Daniel Vega
 * Description: Demo jQuery plugin for cfObjective 2011
 */
(function( $ ){
	
	// PUBLIC FUNCTION ADDED TO THE jQuery.fn Object
	$.fn.blogslider = function( options ) {

		var timer = null;
		var aboutEnabled = true;
		var settings = {autoPlay:true,slideDelay:3000};
		
		// override settings with passed parameters
		if( options ) {$.extend(settings,options);}
		
		var blogs = $('.blog',this);
		var menuItems = $('#bsnavigation li',this); 
		
		// show first blog 
		$('.blog:first',this).addClass('current').show();
		// add the active class to the first navigation item
		menuItems.first().addClass('active');
		
		
		// NAVIGATION ITEMS CLICK EVENT
		menuItems.live('click',function(e){
			e.preventDefault();
			
			var thisMenuItem = $( this );
			var image = thisMenuItem.find('a').attr("href");
			var blog = blogs.find("img[src='" + image + "']").closest('.blog');
			
			// hide all the blogs 
			blogs.hide();
			
			// fade in the current one
			blog.fadeIn();
			
			menuItems.removeClass('active');
			thisMenuItem.addClass('active');
			
			clearTimeout(timer);
		});
		
		
		// SHOW/HIDE ABOUT	
		$('.hideme').click(function(e){
			if( aboutEnabled ){
				$('.about').slideToggle( "normal", function(){
					$(this).css('display','none');
				});
				$('.hideme').html('Show Description');
			} else {
				$('.about').slideToggle();
				$('.hideme').html('Hide Description');			
			}
			aboutEnabled = aboutEnabled ? false : true;
			return false;
		});	
		
		
		// AUTO PLAY
		if( settings.autoPlay ) {
			timer = setInterval(function(){
				
				for( var i=0; i < blogs.length; ++i){
					var $current = $(blogs[i]);
					if( $current.hasClass('current') ){
						var next = ( i+1 == blogs.length) ? 0 : i+1;
						var blog = $(blogs[next]);
													
						blogs.hide();
						$current.removeClass('current');
						blog.fadeIn().addClass('current');
						
						// navigation menu
						menuItems.removeClass('active');
						$(menuItems[next]).addClass('active');
						
						break;								
					}
				}
				
			}, settings.slideDelay );
		}
		
		return this;		
	};
		
	// PRIVATE METHODS
	function trace(o){
		if (this.console && typeof console.log != "undefined") {
			console.log(o);
		}
	}
	
})( jQuery )

