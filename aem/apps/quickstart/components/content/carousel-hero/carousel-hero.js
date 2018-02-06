
//CarouselHeroList "class"

(function ($) {
	//public variables
	//CarouselHeroList.prototype.var_name = "";

	//static variables
	CarouselHeroList.STATIC_VAR = "";

	//constructor function
	function CarouselHeroList(root){
		//private variables
        var _root = root;
        var _navlinks = _root.find('.hero-list--nav--link');
        var _tiles = _root.find('.hero-list--tiles');
        var _scrollActive = false;
        var _root_topy = _root.offset().top;
        var _root_boty = _root_topy + _root.height();
        var _tileIndex = 0;

		//public functions
		this.init = function(){
            _navlinks.click(function(){
                selectTile($(this).parent().index());
            });
            
            _root.find('.hero-list--tile').each(function(){
                $(this).css({
                    'background-image':'url('+$(this).data('bg')+')'
                })
            });

            // $(window).mousemove(function(e){
            //     _scrollActive = e.pageY > _root_topy && e.pageY < _root_boty ? true : false;
            //     if(_scrollActive) {
            //         $('body').addClass('over-hero-tiles');
            //     }else{
            //         $('body').removeClass('over-hero-tiles');
            //     }
            // });
            
            // //listen to global scroll event
            // $(window).on('globalScroll', function(e){
            //     console.log(_scrollActive);
                
            // });
            
            selectTile(0);
		};

		//private functions
		function selectTile(index){
            console.log(index);
            _root.find('.hero-list--nav--item a').removeClass('active');
            $('.hero-list--nav--item').eq(index).find('a').addClass('active');
            _tiles.append(_root.find('.hero-list--tile[data-tile='+index+']'));
		};
        this.init();
	}

	$(document).ready(function() {
		$('.hero-list').each(function(){
			new CarouselHeroList($(this));
		});
	});
	
}(jQuery));