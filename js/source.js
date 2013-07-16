/*
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
*/

$(document).ready(function() {
	ascensor_gallery.set_loading();
	$(".ascensor-gallery-loading").css({backgroundSize: "cover"});
});

var ascensor_gallery_options = {
	target: "container",
	rows: 5,
	image_tooltips: true
}

$(window).load(function() {
	ascensor_gallery.init(ascensor_gallery_options);
});