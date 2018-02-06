//PardotIframe "class"

(function ($) {
	//public variables

	//constructor function
	function PardotIframe(param){
		//private variables
		var _iframe = param;
		//public functions
		this.init = function(){
			window.addEventListener('message', function(e) {
				e.stopPropagation();
				if(e.data && e.data.length > 1){
					var parsedData = {};
					e.data.split(',').forEach(function(i){
						var ar = i.split('=');
						parsedData[ar[0]] = ar[1];
					});
					if(parsedData.url == _iframe.attr('src')){
						_iframe.attr('height',parsedData.pardotFormHeight+'px').css({'height':parsedData.pardotFormHeight+'px'});
					}
				}
			}, false);
		};
		this.init();
	}

	$(document).ready(function() {
		$('.pardot-iframe').each(function(){
			new PardotIframe($(this));
		});
	});
}(jQuery));

// corresponding pardot code
// <script type="text/javascript">
// 	var height = (document.querySelector('html').offsetHeight + 20);
// 	window.top.postMessage('pardotFormHeight=' + height+',url='+window.location+',event=load', '*');

// 	window.addEventListener('resize', function(e){
// 		var height = (document.querySelector('html').offsetHeight + 20);
// 		window.top.postMessage('pardotFormHeight=' + height+',url='+window.location+',event=resize', '*');
// 	});
// </script>