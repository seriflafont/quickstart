var PAGE = (function ($) {
	var page = {};
	// module code here
	page.init = function(){
		console.log('page init');
	}
	return page;
}(jQuery));
$(document).ready(function() {
	PAGE.init();
});