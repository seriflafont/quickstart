
//NavComponent "class"

(function ($) {
	//public variables

	//constructor function
	function NavComponent(param){
		//private variables
		var _root = param;
		var _body = $('body');
        var _hamburger = _root.find('.hamburger-button');
        var _hamburgerMenu = _root.find('.hamburger-menu');
		var _deskMenu = _root.find('.desk-menu');
		var _sectionLinks = _deskMenu.find('.section-link');

		//public functions
		this.init = function(){
			_hamburger.find('a').click(function(e){
                _root.toggleClass('open');
				_body.toggleClass('stop-scroll');
				e.preventDefault();
            });
			_deskMenu.find('a.section-link').click(function(e){
				var a = $(this);
				goto(a.data('section'));
				e.preventDefault();
			});
            _hamburgerMenu.find('a.section-link').click(function(e){
				var a = $(this);
                _root.removeClass('open');
				_body.removeClass('stop-scroll');
				goto(a.data('section'));
				e.preventDefault();
            });
			// setTimeout(function(){
			// 	_root.css({'opacity':'1'});
			// }, 500);

			$(window).on('scroll', function(){
				testContentPlacement();
			});
		};
		function selectLink(a){
			_deskMenu.find('a.section-link').removeClass('selected');
			a.addClass('selected');
		}
		function goto($place){
			var place = $('#'+$place);
			var pos = place.offset().top - 100;
			//console.log('place = '+$place+', pos = '+pos);
			//$('html').getNiceScroll(0).doScrollTop(pos, 2500);
			$('html, body').stop().animate({scrollTop: pos}, 2500, "easeOutExpo");
		}
		function testContentPlacement(){
			for(var i=0;i<_sectionLinks.length;i++){
				var el = $(_sectionLinks[i]);
				if(isScrolledIntoView($('#'+el.data('section'))[0])){
					selectLink(el);
				}
			}
		}
		function isScrolledIntoView(elem) {
			var elementBounds = elem.getBoundingClientRect();
			return elementBounds.top < 150 && elementBounds.bottom >= 0;
		}
		this.init();
	}

	$(document).ready(function() {
		$('.nav-component').each(function(){
			new NavComponent($(this));
		});
	});
	
}(jQuery));
