//OverlayComponent "class"

(function ($) {
	//public variables

	//constructor function
	function OverlayComponent(param, onMobileIOS){
		//private variables
		var _root = param;
		var _body = $('body');
        var _overlayLaunchBtn = $('.'+_root.data('launch-btn-class'));
		var _overlayCloseBtn = _root.find('.close-overlay-btn');
		var _htmlPage = _root.data('html-alt-pageurl');
		var _onMobileIOS = onMobileIOS;

		//public functions
		this.init = function(){
			_overlayLaunchBtn.click(function(){
				if(_onMobileIOS){
					window.location = _htmlPage;
				}
                _root.toggleClass('open');
				_body.addClass('stop-scroll');
            });
            _overlayCloseBtn.click(function(e){
				e.preventDefault();
                _root.removeClass('open');
				_body.removeClass('stop-scroll');
            });
		};
		this.init();
	}

	$(document).ready(function() {
		var onMobileIOS = false;
		if( /iPhone|iPad/i.test(navigator.userAgent) ) {
			onMobileIOS=true;
		}
		$('.overlay-panel').each(function(){
			new OverlayComponent($(this), onMobileIOS);
		});
	});

}(jQuery));