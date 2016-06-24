require( [ 'jquery' , 'calculos' ] , function( $ , calculos ){
	$(function(){
		var instancia;
		$( '#btn-adicao' ).on( 'click' , function(){
			event.preventDefault();
			var val1 = parseInt( $( '#input1' ).val() );
			var val2 = parseInt( $( '#input2' ).val() );
			alert( calculos.adicao( val1 , val2 ) );
		});
		$( '#btn-subtrair' ).on( 'click' , function(){
			var val1 = parseInt( $( '#input1' ).val() );
			var val2 = parseInt( $( '#input2' ).val() );
			alert( calculos.subtracao( val1 , val2 ) );
		});	
	});
});