
//TextareaComponent "class"

(function ($) {
	//public variables
	//TextareaComponent.prototype.var_name = "";

	//static variables
	TextareaComponent.STATIC_VAR = "";

	//constructor function
	function TextareaComponent(param){
		//private variables
		var _pvar = param;

		//public functions
		this.init = function(){
			console.log('TextareaComponent init');
		};

		//private functions
		function priFunction(){
			console.log('something else');
		};

		this.init();
	}

	$(document).ready(function() {
		$('.textarea-component').each(function(){
			new TextareaComponent($(this));
		});
	});
	
}(jQuery));
