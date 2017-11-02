var PAGE = (function ($) {
	var page = {};
	var _animateScrollElements;
	var _scrollpos = 0;
	var _resizeInt;
	var _iframeCoverTO;
	var _mode = $(window).width() > 768 ? 'desktop' : 'mobile';
	var _iframeCover = $('.mouse-wheel-cover');
	// module code here
	page.init = function(){
		_animateScrollElements = $('.animate-on-scroll');
		$(window).on('scroll', function(){
			if($('body').hasClass('stop-scroll')) {
				$(window).scrollTop(_scrollpos);
				return;
			}
			testAnimateInElements();
			_scrollpos = $(window).scrollTop();
			$(window).trigger('globalScroll');
			_iframeCover.addClass('scrolling');
		});
		$(window).on('resize',function(){
			_mode = $(window).width() > 768 ? 'desktop' : 'mobile';
			clearInterval(_resizeInt);
			_resizeInt = setInterval(function(){
				globalResizeFunctions();
				clearInterval(_resizeInt);
			}, 100);
		});

		_iframeCover.on('click', function(){
			_iframeCover.removeClass('scrolling');
			_iframeCoverTO = setTimeout(function(){
				clearTimeout(_iframeCoverTO);
				_iframeCover.addClass('scrolling');
			}, 3000);
		});

		setupLinkTracking();
		responsiveImages();
	}
	function globalResizeFunctions(){
		_scrollpos = $(window).scrollTop();
		testAnimateInElements();
		responsiveImages();
		$(window).trigger('globalResize');
		$('html').getNiceScroll().resize();
	}

	function testAnimateInElements(){
		for(var i=0;i<_animateScrollElements.length;i++){
			var el = $(_animateScrollElements[i]);
			if(isScrolledIntoView(el[0])){
				if(!el.hasClass('animate-in')) el.addClass('animate-in');
			}else{
				if(el.hasClass('animate-in')) el.removeClass('animate-in');
			}
		}
	}
	
	function isScrolledIntoView(elem) {
		var elementBounds = elem.getBoundingClientRect();
		return elementBounds.top < window.innerHeight && elementBounds.bottom >= 0;
	}

	function responsiveImages(){
		$('.responsive-image').each(function(){
			var img = $(this);
			if(_mode == 'desktop'){
				img.attr('src',img.data('desk-src'));
			}else{
				img.attr('src',img.data('mobile-src'));
			}
		});
	}

	function setupLinkTracking(){
		$('.track-link').click(function(e){
			handleOutboundLinkClicks(e);
		});
	}
	return page;
}(jQuery));

$(document).ready(function() {
	$("html").niceScroll({
		zindex:1000,
		cursorwidth:8,
		cursorcolor:"#181818",
		cursoropacitymin:1,
		background:"#cccccc",
		cursorborder: "0px solid #fff",
		cursorborderradius: "5px"
	});
	PAGE.init();
});