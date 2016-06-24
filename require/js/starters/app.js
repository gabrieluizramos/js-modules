requirejs.config({
	'baseURL' : 'js/modules' ,
	'paths' : {
		'jquery' : '../libs/jquery-3.0.0.min' , 
		'main' : '../main' , 
		'calculos' : '../modules/calculos'
	}
});

require( [ 'main' ] );