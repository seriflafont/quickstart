//GalleryComponent "class"

(function ($) {
	//public variables

	//constructor function
	function GalleryComponent(param){
		//private variables
        var _root = param;
        var _tiles = _root.find('li');

		//public functions
		this.init = function(){
			_tiles.each(function(){
                var img = $(this).find('img');
                $(this).css({
                    'background-image':'url('+img.attr('src')+')'
                });
                img.addClass('hide');
            });
		};
		this.init();
	}

	$(document).ready(function() {
		$('.gallery-component').each(function(){
			new GalleryComponent($(this));
		});
	});
}(jQuery));