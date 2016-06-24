var login = {
	config : {} ,
	events : {
		seePassword : {
			mousedown : function(){
				$( login.config.elements.password ).attr( 'type' , 'text' );
			} , 
			mouseup : function(){
				$( login.config.elements.password ).attr( 'type' , 'password' );
			}
		} ,
		init : function(){
			$( login.config.elements.seeker ).bind( login.events.seePassword );
		} ,
	} ,
	init : function( options  ){
		// atribui options, a login config extendendo jquery
		$.extend( login.config, options );
		login.events.init();
	}
}