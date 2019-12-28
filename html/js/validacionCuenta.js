function establecerEventoParaCamposValidacion(){
	$('#contrasenaCredi').keyup(validarContrasenaCredi);
	$('#repiteContrasenaCredi').keyup(validarRepiteContrasenaCredi);

}

function validarFormularioCuentaCredi(){
	let todoLosCamposCorrectos = true
	todoLosCamposCorrectos = validarContrasenaCredi();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarRepiteContrasenaCredi();
	if(!todoLosCamposCorrectos){return false}

	return todoLosCamposCorrectos;
}

function validarContrasenaCredi(){
	let correcto = true;
	$('.error-contrasenaCredi').remove();
	$('.temporal').remove();
	let contrasenaCredi = $('#contrasenaCredi');
	if(contrasenaCredi.val() ==''){
		$(contrasenaCredi).after('<span class="error-contrasenaCredi">Ingrese tu contraseña</span>');
		correcto = false;
	}
	else if(contrasenaCredi.val().length<8){
		$(contrasenaCredi).after('<span class="error-contrasenaCredi">Debe ser como minimo 8 caracteres</span>');
			correcto = false;
	}

	if(!correcto){
		$('#group-contrasenaCredi').addClass('has-error has-feedback');
		$('#group-contrasenaCredi').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-contrasenaCredi').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-contrasenaCredi').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-contrasenaCredi span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}

function validarRepiteContrasenaCredi(){

	let correcto = true;
	$('.error-repiteContrasenaCredi').remove();
	$('.temporal').remove();
	let repiteContrasenaCredi = $('#repiteContrasenaCredi');
	if(repiteContrasenaCredi.val() ==''){
		$(repiteContrasenaCredi).after('<span class="error-repiteContrasenaCredi">Ingrese tu contraseña</span>');
		correcto = false;
	}
	else if(repiteContrasenaCredi.val().length<8){
		$(repiteContrasenaCredi).after('<span class="error-repiteContrasenaCredi">Debe ser como minimo 8 caracteres</span>');
			correcto = false;
	}else if(repiteContrasenaCredi.val()!=$('#contrasenaCredi').val()){
		$(repiteContrasenaCredi).after('<span class="error-repiteContrasenaCredi">Las contraseñas no coinciden</span>');
			correcto = false;
	}
	if(!correcto){
		$('#group-repiteContrasenaCredi').addClass('has-error has-feedback');
		$('#group-repiteContrasenaCredi').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-repiteContrasenaCredi').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-repiteContrasenaCredi').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-repiteContrasenaCredi span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;

}