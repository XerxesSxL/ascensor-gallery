/*
	jQuery based Ascensor gallery
	v1.0
	Sean X. Luo
	
	TODO:
		For some reason, the loading screen is flashing on top of the other elements, so we can see some of the base content before the loading screen kicks in
			- we may have to not dynamically create the loading screen and have it in the DOM already to address this
		Since we're generating everything based on existing markup, I assume that once the image has loaded, it'll get cached so we're not loading it again when we
			put it into the Ascensor gallery...
	
	GOTCHAS:
		Loading screen should be initialised on document ready
		Actual Ascensor gallery plugin should be initialised on window load
	
	FEATURES:
		Ascensor based full screen gallery
		Custom overlays for each gallery
		Support for touch interface
		Support for swipe based interface
		jScrollPane for overlay content
		"Responsive"
		Backwards compatible to IE7, your mileage may vary on custom stylings
	
	REQUIRES:
		jQuery (duh): //ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
		jQuery UI: //ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
		Ascensor (duh): http://kirkas.ch/ascensor/
			- we have a custom rolled version of this plugin, with custom code at line 169
		Easing: http://gsgd.co.uk/sandbox/jquery/easing/
		Mousewheel: https://github.com/brandonaaron/jquery-mousewheel
		TouchSwipe: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
		BackgrounSize: https://github.com/louisremi/jquery.backgroundSize.js
		jScrollPane (jQuery Mousewheel): http://jscrollpane.kelvinluck.com/
		ascensor_gallery.js file (this file)
		ascensor_gallery.css file (bundled base CSS styles)
	
	DEFAULT OPTIONS:
		//	target to initialize ascensor gallery in
		target: "container",
		//	instructions text
		loading_instructions: "you can use your arrow keys, a 2-finger directional swipe, or the navigation menu in the top right to move around",
		//	whether or not to override default tooltips
		tooltip: true,
		//	whether or not to load image thumbnail tooltips
		image_tooltips: false,
		//	whether or not to initialize touch functionality
		touch: true,
		//	whether or not to initialize swipe functionality
		swipe: true,
		//	how many rows of navigation indicators do you want
		rows: 5,
		//	how far apart do you want the navigation indictors to be
		gutter: 10,
		//	how wide do you want the navigation indicators to be
		link_width: 10,
		//	how tall do you want the navigation indicators to be
		link_height: 10,
		//	CLASSES, try not to override if possible
		//	class to initialize jscrollpane on
		fancy_scroll_class: "fancy-scroll",
		//	class to indicate if a jscrollpane initialised element is scrollable
		fancy_scrollable_class: "jspScrollable",
		//	internal ascensor gallery hide class
		hide_class: "ascensor-gallery-hide",
		//	class of elements to stretch background images for
		bg_stretch_class: "ascensor-gallery-stretch-bg",
		//	internal ascensor gallery loading class
		loading_class: "ascensor-gallery-loading",
		//	internal ascensor gallery loading instructions class
		loading_instruction_class: "ascensor-gallery-loading-instructions",
		//	internal ascensor gallery container class
		container_class: "ascensor-gallery-container",
		//	this is the ascensor link class, as referenced in ascensor
		ascensor_link_class: "ascensorLink",
		//	internal ascensor gallery overlay class to hold the overlay content
		image_overlay_class: "ascensor-gallery-image-overlay",
		//	internal ascensor gallery slide class to reference each ascensor slide
		slide_class: "ascensor-gallery-slide",
		//	internal ascensor gallery navigation wrapper class
		nav_class: "ascensor-gallery-navigation",
		//	ascensor movement speed
		ascensor_speed: 1000,
		//	ascensor easing
		ascensor_easing: "easeInOutCubic",
		//	reference to internal ascensor function to manually call movement, as referenced in ascensor:
		//	left
		ascensor_left: "ascensorLeft",
		//	right
		ascensor_right: "ascensorRight",
		//	up
		ascensor_up: "ascensorUp",
		//	down
		ascensor_down: "ascensorDown"
	
	EXAMPLE:
		<link rel="stylesheet" type="text/css" media="all" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/start/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" media="all" href="css/jquery.jscrollpane.css" />
		<link rel="stylesheet" type="text/css" media="all" href="css/ascensor_gallery.css" />
		<!-- MORE -->
		<div class="container" id="container">
			<div>
				<img src="/PATH/TO/IMAGE" title="[IMAGE TITLE]" alt="[IMAGE TITLE]" />
				<div>
					<h2>[IMAGE TITLE]</h2>
					[IMAGE OVERLAY DESCRIPTION]
				</div>
			</div>
		</div>
		<!-- MORE -->
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
		<script type="text/javascript" src="js/jquery.ascensor.custom.js"></script>
		<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
		<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
		<script type="text/javascript" src="js/jquery.touchSwipe.min.js"></script>
		<script type="text/javascript" src="js/jquery.backgroundSize.js"></script>
		<script type="text/javascript" src="js/ascensor_gallery.js"></script>
		<!-- MORE -->
		<script type="text/javascript">
			$(document).ready(function() {
				ascensor_gallery.set_loading();
			});
			
			var ascensor_gallery_options = {
				target: "container",
				rows: 5
			}
			
			$(window).load(function() {
				ascensor_gallery.init(ascensor_gallery_options);
			});
		</script>
*/

ascensor_gallery = {

	//	ascensor options, pretty much the default
	ascensor_options: {
		AscensorName: "ascensor",
		ChildType: "div",
		AscensorFloorName: "",
		Time: 1000,
		Easing: "easeInOutCubic",
		WindowsOn: 1,
		Direction: "chocolate",
		AscensorMap: "",
		KeyNavigation: true,
		Queued: false,
		QueuedDirection: "x"
	},
	
	//	user settable options
	options: {
		//	target to initialize ascensor gallery in
		target: "container",
		//	instructions text
		loading_instructions: "you can use your arrow keys, a 2-finger directional swipe, or the navigation menu in the top right to move around",
		//	whether or not to override default tooltips
		tooltip: true,
		//	whether or not to load image thumbnail tooltips
		image_tooltips: false,
		//	whether or not to initialize touch functionality
		touch: true,
		//	whether or not to initialize swipe functionality
		swipe: true,
		//	how many rows of navigation indicators do you want
		rows: 5,
		//	how far apart do you want the navigation indictors to be
		gutter: 10,
		//	how wide do you want the navigation indicators to be
		link_width: 10,
		//	how tall do you want the navigation indicators to be
		link_height: 10,
		//	CLASSES, try not to override if possible
		//	class to initialize jscrollpane on
		fancy_scroll_class: "fancy-scroll",
		//	class to indicate if a jscrollpane initialised element is scrollable
		fancy_scrollable_class: "jspScrollable",
		//	internal ascensor gallery hide class
		hide_class: "ascensor-gallery-hide",
		//	class of elements to stretch background images for
		bg_stretch_class: "ascensor-gallery-stretch-bg",
		//	internal ascensor gallery loading class
		loading_class: "ascensor-gallery-loading",
		//	internal ascensor gallery loading instructions class
		loading_instruction_class: "ascensor-gallery-loading-instructions",
		//	internal ascensor gallery container class
		container_class: "ascensor-gallery-container",
		//	this is the ascensor link class, as referenced in ascensor
		ascensor_link_class: "ascensorLink",
		//	internal ascensor gallery overlay class to hold the overlay content
		image_overlay_class: "ascensor-gallery-image-overlay",
		//	internal ascensor gallery overlay toggle class to reference each ascensor slide
		overlay_toggle_class: "ascensor-gallery-image-overlay-toggle",
		//	internal ascensor gallery slide class to reference each ascensor slide
		slide_class: "ascensor-gallery-slide",
		//	internal ascensor gallery navigation wrapper class
		nav_class: "ascensor-gallery-navigation",
		//	ascensor movement speed
		ascensor_speed: 1000,
		//	ascensor easing
		ascensor_easing: "easeInOutCubic",
		//	reference to internal ascensor function to manually call movement, as referenced in ascensor:
		//	left
		ascensor_left: "ascensorLeft",
		//	right
		ascensor_right: "ascensorRight",
		//	up
		ascensor_up: "ascensorUp",
		//	down
		ascensor_down: "ascensorDown"
	},
	
	//	non user-settable options, stores for internal use
	SCROLL_MOVING: false,
	LOADING: null,
	ASCENSOR: null,
	ASCENSOR_NAV: null,
	ASCENSOR_FLOORS: [],
	ASCENSOR_MAP: [],
	NUM_FLOORS: 0,
	
	//	initializes the ascensor gallery
	init: function(options) {
		//	sets options
		ascensor_gallery.set_options(options);
		//	initializes ascensor
		ascensor_gallery.init_ascensor();
		//	initializes jscrollpane
		ascensor_gallery.bind_jscrollpane();
		//	set full size background image
		ascensor_gallery.bind_background_size();
		//	bind overlay hover events
		ascensor_gallery.bind_overlay_hover();
		if( ascensor_gallery.options.tooltip ) {
			//	initializes tooltip
			ascensor_gallery.init_tooltip();
		}
		if( ascensor_gallery.options.touch ) {
			//	initializes touch interface
			ascensor_gallery.bind_touch();
		}
		if( ascensor_gallery.options.swipe ) {
			//	initializes swipe interface
			ascensor_gallery.bind_swipe();
		}
	},
	
	//	sets options
	set_options: function(options) {
		for( i in options ) {
			if( typeof ascensor_gallery.options[i] !== "undefined" ) {
				ascensor_gallery.options[i] = options[i];
			}
		}
	},
	
	//	runs callback with passed options object
	run_callback: function(f, options) {
		f(options);
	},
	
	//	creates a loading screen as this gallery might be a bit load intensive since it's a single page gallery with full screen images
	set_loading: function() {
		$("#" + ascensor_gallery.options.target).addClass(ascensor_gallery.options.container_class);
		var loading = '<div class="' + ascensor_gallery.options.loading_class + ' ' + ascensor_gallery.options.bg_stretch_class + '" id="' + ascensor_gallery.options.loading_class + '"><div class="' + ascensor_gallery.options.loading_instruction_class + ' ' + ascensor_gallery.options.hide_class + '" id="' + ascensor_gallery.options.loading_instruction_class + '">' + ascensor_gallery.options.loading_instructions + '</div></div>';
		ascensor_gallery.LOADING = $(loading);
		$("body").prepend(ascensor_gallery.LOADING);
		ascensor_gallery.set_loading_size();
		$(window).resize(function() {
			ascensor_gallery.set_loading_size();
		});
		$(window).load(function() {
			$("#" + ascensor_gallery.options.loading_instruction_class).fadeIn(1000, function() {
				$("#" + ascensor_gallery.options.loading_class).click(function() {
					ascensor_gallery.hide_loading();
				});
				$("." + ascensor_gallery.options.ascensor_left).click(function() {
					ascensor_gallery.hide_loading();
				});
				setTimeout(function() {
					ascensor_gallery.hide_loading();
				}, 5000);
			});
		});
	},
	
	//	sets the loading screen's dimensions
	set_loading_size: function() {
		$("#" + ascensor_gallery.options.loading_class).css({
			width: $(window).width() + "px",
			height: $(window).height() + "px"
		});
	},
	
	//	hides the loading screen
	hide_loading: function() {
		$("#" + ascensor_gallery.options.loading_class).fadeOut(1000, function() {
			$("#" + ascensor_gallery.options.loading_class).remove();
		});
	},
	
	//	initializes ascensor
	init_ascensor: function() {
		//	set some ascensor options
		ascensor_gallery.ascensor_options.Time = ascensor_gallery.options.ascensor_speed;
		ascensor_gallery.ascensor_options.Easing = ascensor_gallery.options.ascensor_easing;
		//	we're generating everything from markup here
		ascensor_gallery.generate_ascensor();
	},
	
	//	generates the actual ascensor HTML along with the navigation, then initializes on the newly generated HTML
	generate_ascensor: function() {
		var html = "";
		var nav_html = '<div class="' + ascensor_gallery.options.nav_class + '" id="' + ascensor_gallery.options.nav_class + '">';
		var which_win = 1;
		var which_floor = 1;
		$("#" + ascensor_gallery.options.target).children().each(function() {
			var image = $(this).find("img");
			var overlay = $(this).find("div");
			ascensor_gallery.ASCENSOR_FLOORS.push(image.attr("title"));
			ascensor_gallery.NUM_FLOORS++;
			ascensor_gallery.ASCENSOR_MAP.push(which_win + "|" + which_floor);
			html += '<div style="background:url(' + image.attr("src") + ') center center no-repeat;" class="' + ascensor_gallery.options.bg_stretch_class + ' ' + ascensor_gallery.options.slide_class + '">';
				html += '<div class="' + ascensor_gallery.options.image_overlay_class + ' ' + ascensor_gallery.options.fancy_scroll_class + ' ' + ascensor_gallery.options.hide_class + '">';
					html += overlay.html();
				html += '</div>';
				html += '<div class="' + ascensor_gallery.options.overlay_toggle_class + '">';
					html += '[+]';
				html += '</div>';
			html += '</div>';
			var css = [
				"width:" + ascensor_gallery.options.link_width + "px;",
				"height:" + ascensor_gallery.options.link_height + "px;",
				"top:" + ( which_win * ( ascensor_gallery.options.link_height + ascensor_gallery.options.gutter ) ) + "px;",
				"left:" + ( which_floor * ( ascensor_gallery.options.link_width + ascensor_gallery.options.gutter ) ) + "px;"
			]
			css = css.join("");
			nav_html += '<a class="' + ascensor_gallery.options.ascensor_link_class + ' ' + ascensor_gallery.options.ascensor_link_class + ascensor_gallery.NUM_FLOORS + '" title="' + image.attr("title") + '" tooltip-thumbnail="' + image.attr("src") + '" style="' + css + '"></a>'
			if( which_win%ascensor_gallery.options.rows == 0 ) {
				which_win = 1;
				which_floor++;
			} else {
				which_win++;
			}
		});
		nav_html += '</div>';
		//	set some more ascensor options
		ascensor_gallery.ascensor_options.AscensorFloorName = ascensor_gallery.ASCENSOR_FLOORS.join(" | ");
		ascensor_gallery.ascensor_options.AscensorMap = ascensor_gallery.ASCENSOR_MAP.join(" & ");
		//	actually writes generated HTML to DOM
		ascensor_gallery.ASCENSOR = $(html);
		ascensor_gallery.ASCENSOR_NAV = $(nav_html);
		$("body").append(ascensor_gallery.ASCENSOR_NAV);
		$("." + ascensor_gallery.options.nav_class).css({
			width: ( Math.ceil( ascensor_gallery.NUM_FLOORS / ascensor_gallery.options.rows ) + 1 ) * ( ascensor_gallery.options.link_width + ascensor_gallery.options.gutter ) + "px",
			height: ( ascensor_gallery.options.rows + 1 ) * (ascensor_gallery.options.link_height + ascensor_gallery.options.gutter ) + "px"
		});
		$("#" + ascensor_gallery.options.target).html(ascensor_gallery.ASCENSOR);
		//	initializes ascensor
		ascensor_gallery.bind_ascensor();
	},
	
	//	initializes ascensor
	bind_ascensor: function() {
		$("#" + ascensor_gallery.options.target).ascensor(ascensor_gallery.ascensor_options);
	},
	
	//	initializes fancy tooltips
	init_tooltip: function() {
		$( document ).tooltip({
			track: true,
			content: function() {
				var element = $(this);
				var tooltip_thumbnail = element.attr("tooltip-thumbnail");
				if( typeof tooltip_thumbnail !== "undefined" && tooltip_thumbnail !== "" && ascensor_gallery.options.image_tooltips ) {
					return '<img class="tooltip-thumbnail-image" width="100" src="' + element.attr("tooltip-thumbnail") + '" />';
				}
				return element.attr("title");
			}
		});
	},
	
	//	initializes jscrollpane
	bind_jscrollpane: function() {
		$("." + ascensor_gallery.options.fancy_scroll_class).jScrollPane({
			autoReinitialise: true
		});
	},
	
	//	bind touch events
	bind_touch: function() {
		$("#" + ascensor_gallery.options.target).swipe({
			swipeLeft: function(event, direction, distance, duration, fingerCount) {
				ascensor_gallery.ascensor_right();
			},
			swipeRight: function(event, direction, distance, duration, fingerCount) {
				ascensor_gallery.ascensor_left();
			},
			swipeUp: function(event, direction, distance, duration, fingerCount) {
				ascensor_gallery.ascensor_down();
			},
			swipeDown: function(event, direction, distance, duration, fingerCount) {
				ascensor_gallery.ascensor_up();
			}
		});
	},
	
	//	bind swipe events
	bind_swipe: function() {
		$("#" + ascensor_gallery.options.target + ":not(." + ascensor_gallery.options.fancy_scrollable_class + ")").mousewheel(function(event, delta, deltaX, deltaY) {
			event.preventDefault();
			event.stopPropagation();
			if( !ascensor_gallery.SCROLL_MOVING ) {
				if( Math.abs( deltaX ) > Math.abs( deltaY ) ) {
					if( deltaX > 0 ) { 
						ascensor_gallery.SCROLL_MOVING = true;
						ascensor_gallery.ascensor_right();
						setTimeout(function() {
							ascensor_gallery.SCROLL_MOVING = false;
						}, ascensor_gallery.options.ascensor_speed);
					} else {
						ascensor_gallery.SCROLL_MOVING = true;
						ascensor_gallery.ascensor_left();
						setTimeout(function() {
							ascensor_gallery.SCROLL_MOVING = false;
						}, ascensor_gallery.options.ascensor_speed);
					}
				} else {
					if( deltaY > 0 ) {
						ascensor_gallery.SCROLL_MOVING = true;
						ascensor_gallery.ascensor_up()
						setTimeout(function() {
							ascensor_gallery.SCROLL_MOVING = false;
						}, ascensor_gallery.options.ascensor_speed);
					} else {
						ascensor_gallery.SCROLL_MOVING = true;
						ascensor_gallery.ascensor_down();
						setTimeout(function() {
							ascensor_gallery.SCROLL_MOVING = false;
						}, ascensor_gallery.options.ascensor_speed);
					}
				}
			}
		});
	},
	
	//	wrapper functions to call ascensor navigation methods manually
	
	//	to the left
	ascensor_left: function() {
		$("#" + ascensor_gallery.options.target).trigger({
			type: ascensor_gallery.options.ascensor_left
		})
	},
	
	//	to the right
	ascensor_right: function() {
		$("#" + ascensor_gallery.options.target).trigger({
			type: ascensor_gallery.options.ascensor_right
		})
	},
	
	// going up
	ascensor_up: function() {
		$("#" + ascensor_gallery.options.target).trigger({
			type: ascensor_gallery.options.ascensor_up
		})
	},
	
	//	going down
	ascensor_down: function() {
		$("#" + ascensor_gallery.options.target).trigger({
			type: ascensor_gallery.options.ascensor_down
		})
	},
	
	//	bind full screen background
	bind_background_size: function() {
		$("." + ascensor_gallery.options.bg_stretch_class).css({backgroundSize: "cover"});
	},
	
	//	bind overlay hover events
	bind_overlay_hover: function() {
		$("." + ascensor_gallery.options.overlay_toggle_class).hover(
			function() {
				$(this).fadeOut();
				$(this).parent().find("." + ascensor_gallery.options.image_overlay_class).fadeIn();
			},
			function() {
				//	do nothing
			}
		);
		$("." + ascensor_gallery.options.image_overlay_class).hover(
			function() {
				$(this).show();
			},
			function() {
				$(this).fadeOut();
				$(this).parent().find("." + ascensor_gallery.options.overlay_toggle_class).fadeIn();
			}
		);
	}
	
}