//ParallaxHero "class"

(function ($) {
	//public variables

	//constructor function
	function ParallaxHero(param){
		//private variables
		var _root = param;
		var _parallaxElements = _root.find('.parallax-wrapper');
        var _photos = _root.find('.parallax-photos');
		var _h = 0;
		var _winWidth = $(window).width();
		var _mode = _winWidth > 768 ? 'desktop' : 'mobile';

		//public functions
		this.init = function(){
			layoutPhotos();
            $(window).on('globalResize',function(){
				_h = 0;
				layoutPhotos();
				positionParallaxLayers();
			});
			$(window).on('globalScroll', function(){
				positionParallaxLayers();
			});
			positionParallaxLayers();
		};

		//private functions
		function layoutPhotos(){
            _photos.find('img').each(function(){
				var img = $(this);
				if(img.hasClass('not-loaded')){
					img.on('load',function(){
						var iH = img.innerHeight();
						setPhotoHeight(iH);
						img.removeClass('not-loaded');
					});
					if(_mode == 'desktop'){
						img.attr('src',img.data('desk-src'));
					}else{
						img.attr('src',img.data('mobile-src'));
					}
				}else{
					var iH = img.innerHeight();
					setPhotoHeight(iH);
				}
            });
		};

		function setPhotoHeight($h){
			_h = _h > $h ? _h : $h;
			var margin = _h * .1;
			
			 _photos.removeClass('not-loaded').css({
                'height':_h+'px'
            });
			_photos.siblings('.background').removeClass('not-loaded');
		};

		function positionParallaxLayers(){
			var top, pct;
			var max = window.innerHeight;
			top = _parallaxElements[0].getBoundingClientRect().top - (max/3);
			pct = 100-(Math.round(100 * (max-top)/max));
			if(pct < -100 || pct > 50) return;
			//console.log('pct = '+pct);
			_parallaxElements.find('.parallax-layer').each(function(){
				var layer = $(this);
				var pos = (pct * layer.data('layer-speed'));
				layer.css({
					'-webkit-transform': 'translateY('+pos+'px)',
					'-moz-transform': 'translateY('+pos+'px)',
					'transform':'translateY('+pos+'px)'
				});
			});
			var pos = (pct * _parallaxElements.data('margin-speed'));
			_parallaxElements.css({'margin-bottom':pos+'px'});
		}
		
		this.init();
	}

	$(document).ready(function() {
		$('.parallax-hero').each(function(){
			new ParallaxHero($(this));
		});
	});
	
}(jQuery));
