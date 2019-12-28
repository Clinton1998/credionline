//elCorreoEsValido()
function establecerEventoParaCamposLogin(){
	$('#emailLogin').keyup(validarEmailLogin);
	$('#contrasenaLogin').keyup(validarContrasenaLogin);
}

function validarFormularioLogin(){
	let todoLosCamposCorrectos = true
	todoLosCamposCorrectos = validarEmailLogin();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarContrasenaLogin();
	if(!todoLosCamposCorrectos){return false}

	return todoLosCamposCorrectos;
}
function validarEmailLogin(){
	$('#resultadoLogin').remove();
	let correcto = true;
	$('.error-emailLogin').remove();
	$('.temporal').remove();
	let emailLogin = $('#emailLogin');
	if(emailLogin.val() ==''){
		$(emailLogin).after('<span class="error-emailLogin">Ingresa tu email</span>');
		correcto = false;
	}
	else if(!elCorreoEsValido(emailLogin.val())){
		$(emailLogin).after('<span class="error-emailLogin">Ingrese un email valido</span>');
			correcto = false;
	}
	if(!correcto){
		$('#group-emailLogin').addClass('has-error has-feedback');
		$('#group-emailLogin').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-emailLogin').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-emailLogin').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-emailLogin span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}

function validarContrasenaLogin(){
	$('#resultadoLogin').remove();
	let correcto = true;
	$('.error-contrasenaLogin').remove();
	$('.temporal').remove();
	let contrasenaLogin = $('#contrasenaLogin');
	if(contrasenaLogin.val() ==''){
		$(contrasenaLogin).after('<span class="error-contrasenaLogin">Ingrese tu contraseña</span>');
		correcto = false;
	}
	else if(contrasenaLogin.val().length<8){
		$(contrasenaLogin).after('<span class="error-contrasenaLogin">Contraseña muy corta</span>');
			correcto = false;
	}
	if(!correcto){
		$('#group-contrasenaLogin').addClass('has-error has-feedback');
		$('#group-contrasenaLogin').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-contrasenaLogin').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-contrasenaLogin').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-contrasenaLogin span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}