// objeto com funcoes validacoes
var jValidate = {
	config: {
		url: form.action
	},
	fields : {} ,
	type : {
		cpf : function ( cpf ){
			var Soma;
			var Resto;
			Soma = 0;
			if ( !parseInt( cpf ) ) return false;

			for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
				Resto = (Soma * 10) % 11;

			if ((Resto == 10) || (Resto == 11))  Resto = 0;
			if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

			Soma = 0;
			for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
				Resto = (Soma * 10) % 11;

			if ((Resto == 10) || (Resto == 11))  Resto = 0;
			if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
			return true;
		} ,
		email : function ( email ){
			var regExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
			return regExp.test( email );
		} , 
		nome : function ( nome ){
			nome = nome.trim();
			return nome;
		}
	} ,
	validate : function( type , field ){
		return jValidate.type[ type ]( field );
	} ,
	init : function(){
		var campos = document.querySelectorAll( '[data-validate]' );
		var msg = document.querySelector( '[data-message]' );
		for (var i = 0; i < campos.length; i++) {
			campos[i].onblur = function(){
				if( !jValidate.validate( this.name , this.value ) ){
					msg.setAttribute( 'data-message' , 'error' );
					msg.innerHTML = "Preencha corretamente o campo " + this.name.toUpperCase();
					this.style.borderBottomColor = '#c21d16';
					this.focus();
					jValidate.fields[ this.name ] = false;
				}
				else{
					msg.setAttribute( 'data-message' , 'default' );
					document.querySelector( '[data-message]' ).innerHTML = "";
					this.style.borderBottomColor = '#119027';
					jValidate.fields[ this.name ] = true;
				}
			}
		}
		form.querySelector( '[data-send="button"]' ).onclick = function( event ){
			event.preventDefault();
			if( !jValidate.fields || !jValidate.fields.nome || !jValidate.fields.email || !jValidate.fields.cpf ){
				msg.setAttribute( 'data-message' , 'error' );
				msg.innerHTML = "Preencha corretamente todos os campos";
				this.style.borderBottomColor = '#c21d16';
				return false;
			}
			else{
				var ajax = new XMLHttpRequest();
				ajax.open("POST", jValidate.config.url  , true);
				ajax.onreadystatechange = function() {
				  if (ajax.readyState == 4 && ajax.status == 200) {
				  	var response = parseInt( ajax.responseText );
					if( response ){
						msg.setAttribute( 'data-message' , 'success' );
						msg.innerHTML = "Obrigado por se cadastrar! Enviaremos as novas notícias para seu e-mail.";
					}
					else{
						msg.setAttribute( 'data-message' , 'error' );
						msg.innerHTML = "Falha ao cadastrar e-mail. Por favor, tente novamente!";
					}
					form.reset();
				  }
				}
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				var dataString = 'nome='+form.nome.value+'&email='+form.email.value+'&cpf='+form.cpf.value
				ajax.send( dataString );
			}
		}
	}
}