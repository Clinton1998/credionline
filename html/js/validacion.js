function establecerEventoParaCamposPersonales(){
	$('#dni').keyup(validarDNI);
	$('#nombres').keyup(validarNombres);
	$('#apellidoPaterno').keyup(validarApellidoPaterno);
	$('#apellidoMaterno').keyup(validarApellidoMaterno);
	$('#correo').keyup(validarEmail);
	$('#telefono').keyup(validarTelefono);
}
function establecerEventoParaCamposPersonalesSecundarios(){
	$('#departamento').change(validarDepartamento);
	$('#provincia').change(validarProvincia);
	$('#distrito').change(validarDistrito);
	$('#domicilio').keyup(validarDomicilio)
	$('#departamento').click(eliminarAdicional);
}
function establecerEventoParaCamposLaborales(){
	$('#ruc').keyup(validarRuc);
	$('#nombreEmpresa').keyup(validarNombreEmpresa);
	$('#salario').keyup(validarSalario);
}
function establecerEventoParaCamposModificacion(){
	$('#modTelefonoMovil').keyup(validarModTelefonoMovil);
	$('#modDomicilio').keyup(validarModDomicilio);
	$('#modRuc').keyup(validarModRuc);
	$('#modNombreEmpresa').keyup(validarModNombreEmpresa);
	$('#modSalario').keyup(validarModSalario);
}
function validarModTelefonoMovil(){
	let correcto = true;
	$('.error-telefono').remove();
	$('.temporal').remove();
	let telefono = $('#modTelefonoMovil');
	if(telefono.val() ==''){
		$(telefono).after('<span class="error-telefono">Debes ingresar tu telefono</span>');
		correcto = false;
	}else if(telefono.val().length!=9){
		$(telefono).after('<span class="error-telefono">Debe ser 9 numeros</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-modTelefono').addClass('has-error has-feedback');
		$('#group-modTelefono').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-modTelefono').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-modTelefono').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-modTelefono span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

	return correcto;
}
function validarModDomicilio(){
		let correcto = true;
	$('.error-domicilio').remove();
	$('.temporal').remove();
	let domicilio = $('#modDomicilio');
	if(domicilio.val() ==''){
		$(domicilio).after('<span class="error-domicilio">Debes ingresar tu domicilio</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-modDomicilio').addClass('has-error has-feedback');
		$('#group-modDomicilio').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-modDomicilio').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-modDomicilio').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-modDomicilio span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	
	return correcto;
}

function validarModNombreEmpresa(){
	let correcto = true;
	$('.error-nombreEmpresa').remove();
	$('.temporal').remove();
	let nombreEmpresa = $('#modNombreEmpresa');
	if(nombreEmpresa.val() =='Buscando...'){
		$(nombreEmpresa).after('<span class="error-nombreEmpresa">Verifique el RUC ingresado</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-modNombreEmpresa').addClass('has-error has-feedback');
		$('#group-modNombreEmpresa').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-modNombreEmpresa').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-modNombreEmpresa').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-modNombreEmpresa span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}
function validarModSalario(){
	let correcto = true;
	$('.error-salario').remove();
	$('.temporal').remove();
	let salario = $('#modSalario');
	if(salario.val() =='Salario neto'){
		$(salario).after('<span class="error-salario">Asegurate de encontrar una empresa</span>');
		correcto = false;
	}else if(salario.val()==''){
		$(salario).after('<span class="error-salario">Falta la empresa</span>');
		correcto = false;
	}else if(salario.val()<1500){
		$(salario).after('<span class="error-salario">El salario debe ser como mínimo S/. 1500</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-modSalario').addClass('has-error has-feedback');
		$('#group-modSalario').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-modSalario').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-modSalario').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-modSalario span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}
function validarFormularioDatosPersonales(){
	let todoLosCamposCorrectos = true
	$('.error-dni .error-nombres .error-apellido-paterno .error-apellido-materno .error-telefono .error-email').remove();
	todoLosCamposCorrectos = validarDNI();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarNombres();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarApellidoPaterno();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarApellidoMaterno();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarEmail();
	if(!todoLosCamposCorrectos){return false}

	todoLosCamposCorrectos = validarTelefono();
	if(!todoLosCamposCorrectos){return false}

	return todoLosCamposCorrectos;
}


function validarFormularioDatosLaborales(){
	let todoLosCamposCorrectos = true
	$('.error-ruc .error-nombreEmpresa').remove();
	todoLosCamposCorrectos = validarRuc();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarNombreEmpresa();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarSalario();
	if(!todoLosCamposCorrectos){return false}
	return todoLosCamposCorrectos;
}
function validarFormulariosDatosPersonalesSecundarios(){
	let todoLosCamposCorrectos = true
	todoLosCamposCorrectos = validarDepartamento();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarProvincia();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarDistrito();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarDomicilio();
	if(!todoLosCamposCorrectos){return false}

	return todoLosCamposCorrectos;
}

function validarFormularioModificion(){
	let todoLosCamposCorrectos = true
	todoLosCamposCorrectos = validarModTelefonoMovil();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarModDomicilio();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarModNombreEmpresa();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarModSalario();
	if(!todoLosCamposCorrectos){return false}

	return todoLosCamposCorrectos;
}

function validarRuc(){
	let correcto = true;
	$('.error-ruc').remove();
	$('.temporal').remove();
	let ruc = $('#ruc');
	if(ruc.val() ==''){
		$(ruc).after('<span class="error-ruc">Debe ingresar RUC de la empresa</span>');
		correcto = false;
	}
	else if(ruc.val().length!=11){
		$(ruc).after('<span class="error-ruc">Debe ser 11 numeros</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-ruc').addClass('has-error has-feedback');
		$('#group-ruc').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-ruc').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-ruc').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-ruc span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

	if(correcto){
		buscarEmpresa();
	}else{
		$('#nombreEmpresa').val('Buscando...');
		$('#salario').removeAttr('enabled').attr('disabled','true');
		$('#salario').val('');
		$('#salario').attr('placeholder','Salario neto');
	}
	

	return correcto;
}

function validarModRuc(){
	let correcto = true;
	$('.error-ruc').remove();
	$('.temporal').remove();
	let ruc = $('#modRuc');
	if(ruc.val() ==''){
		$(ruc).after('<span class="error-ruc">Debe ingresar RUC de la empresa</span>');
		correcto = false;
	}
	else if(ruc.val().length!=11){
		$(ruc).after('<span class="error-ruc">Debe ser 11 numeros</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-modRuc').addClass('has-error has-feedback');
		$('#group-modRuc').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-modRuc').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-modRuc').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-modRuc span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

	if(correcto){
		buscarEmpresaModificacion();
	}else{
		$('#modNombreEmpresa').val('Buscando...');
		/*$('#modSalario').removeAttr('enabled').attr('disabled','true');
		$('#salario').val('');
		$('#salario').attr('placeholder','Salario neto');*/
	}
	

	return correcto;
}

function validarNombreEmpresa(){
		let correcto = true;
	$('.error-nombreEmpresa').remove();
	$('.temporal').remove();
	let nombreEmpresa = $('#nombreEmpresa');
	if(nombreEmpresa.val() =='Buscando...'){
		$(nombreEmpresa).after('<span class="error-nombreEmpresa">Verifique el RUC ingresado</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-nombreEmpresa').addClass('has-error has-feedback');
		$('#group-nombreEmpresa').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-nombreEmpresa').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-nombreEmpresa').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-nombreEmpresa span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}

function validarSalario(){
	let correcto = true;
	$('.error-salario').remove();
	$('.temporal').remove();
	let salario = $('#salario');
	if(salario.val() =='Salario neto'){
		$(salario).after('<span class="error-salario">Asegurate de encontrar una empresa</span>');
		correcto = false;
	}else if(salario.val()==''){
		$(salario).after('<span class="error-salario">Falta el salario</span>');
		correcto = false;
	}else if(salario.val()<1500){
		$(salario).after('<span class="error-salario">El salario debe ser como mínimo S/. 1500</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-salario').addClass('has-error has-feedback');
		$('#group-salario').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-salario').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-salario').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-salario span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;

}

function validarDNI(){
	let correcto = true;
	$('.error-dni').remove();
	$('.temporal').remove();
	let dni = $('#dni');
	if(dni.val() ==''){
		$(dni).after('<span class="error-dni">Debe ingresar su DNI</span>');
		correcto = false;
	}
	else if(dni.val().length !=8){
		$(dni).after('<span class="error-dni">Debe ser 8 numeros</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-dni').addClass('has-error has-feedback');
		$('#group-dni').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-dni').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-dni').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-dni span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}

function validarNombres(){
	let correcto = true;
	$('.error-nombres').remove();
	$('.temporal').remove();
	let nombres = $('#nombres');
	if(nombres.val() ==''){
		$(nombres).after('<span class="error-nombres">Debes ingresar tu nombre</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-nombres').addClass('has-error has-feedback');
		$('#group-nombres').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-nombres').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-nombres').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-nombres span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

	return correcto;
}

function validarApellidoPaterno(){
	let correcto = true;
	$('.error-apellido-paterno').remove();
	$('.temporal').remove();
	let apPaterno = $('#apellidoPaterno');
	if(apPaterno.val() ==''){
		$(apPaterno).after('<span class="error-apellido-paterno">Debes ingresar tu apellido paterno</span>');
		correcto = false;
	}

	if(!correcto){
		$('#group-apellidoPaterno').addClass('has-error has-feedback');
		$('#group-apellidoPaterno').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-apellidoPaterno').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-apellidoPaterno').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-apellidoPaterno span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

	return correcto;

}

function validarApellidoMaterno(){
	let correcto = true;
	$('.error-apellido-materno').remove();
	$('.temporal').remove();
	let apMaterno = $('#apellidoMaterno');
	if(apMaterno.val() ==''){
		$(apMaterno).after('<span class="error-apellido-materno">Debes ingresar tu apellido materno</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-apellidoMaterno').addClass('has-error has-feedback');
		$('#group-apellidoMaterno').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-apellidoMaterno').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-apellidoMaterno').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-apellidoMaterno span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

return correcto;
}
function elCorreoEsValido(mail) { 
  		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
}

function validarEmail(){
	let correcto = true;
	$('.error-email').remove();
	$('.temporal').remove();
	let email = $('#correo');

	if(email.val() ==''){
		$(email).after('<span class="error-email">Debes ingresar tu email</span>');
		correcto = false;
	}else if(!elCorreoEsValido(email.val())){
		$(email).after('<span class="error-email">Ingresa un correo valido</span>');
		correcto = false;
	}

	if(!correcto){
		$('#group-email').addClass('has-error has-feedback');
		$('#group-email').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-email').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-email').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-email span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	return correcto;
}

function validarTelefono(){
	let correcto = true;
	$('.error-telefono').remove();
	$('.temporal').remove();
	let telefono = $('#telefono');
	if(telefono.val() ==''){
		$(telefono).after('<span class="error-telefono">Debes ingresar tu telefono</span>');
		correcto = false;
	}else if(telefono.val().length!=9){
		$(telefono).after('<span class="error-telefono">Debe ser 9 numeros</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-telefono').addClass('has-error has-feedback');
		$('#group-telefono').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-telefono').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-telefono').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-telefono span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

	return correcto;
}

function validarDepartamento(){
	


	let correcto = true;
	$('.error-departamento').remove();
	
	let departamento = $('#departamento');
	if(departamento.val() ==''){
		$(departamento).after('<span class="error-departamento">Debes seleccionar tu departamento</span>');
		correcto = false;
		$('#provincia').html('<option>Provincia</option>');
		$('#distrito').html('<option>Distrito</option>');
	}

	if(!correcto){
		$('#group-departamento').addClass('has-error');
	}else{
		$('#group-departamento').removeClass('has-error').addClass('has-success has-feedback');
	}
	if(correcto){
		let nCod_departamento = $('#departamento').val();

		traerProvincias(nCod_departamento);
		
		$('#distrito').append('<option>Distrito</option>');

	}
	
	//$('.carga_distritos').remove();
	return correcto;
}

function eliminarAdicional(){
	$('#optionEliminar').remove();
}
function validarProvincia(){


	let correcto = true;
	$('.error-provincia').remove();
	let provincia = $('#provincia');
	if(provincia.val() ==''){
		$(provincia).after('<span class="error-provincia">Debes seleccionar tu provincia</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-provincia').addClass('has-error');
		
	}else{
		
		$('#group-provincia').removeClass('has-error').addClass('has-success has-feedback');	
	}
	if(correcto){
		let nCod_provincia = $('#provincia').val();
		traerDistritos(nCod_provincia);
	}
	
	return correcto;
}

function validarDistrito(){
	let correcto = true;
	$('.error-distrito').remove();
	let distrito = $('#distrito');
	if(distrito.val() ==''){
		$(distrito).after('<span class="error-distrito">Debes seleccionar tu distrito</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-distrito').addClass('has-error');
		
	}else{
		$('#group-distrito').removeClass('has-error').addClass('has-success has-feedback');
		
	}

	return correcto;
}

function validarDistrito(){
	let correcto = true;
	$('.error-distrito').remove();
	let distrito = $('#distrito');
	if(distrito.val() ==''){
		$(distrito).after('<span class="error-distrito">Debes seleccionar tu distrito</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-distrito').addClass('has-error');
		
	}else{
		$('#group-distrito').removeClass('has-error').addClass('has-success has-feedback');
		
	}

	return correcto;
}

function validarDomicilio(){
	let correcto = true;
	$('.error-domicilio').remove();
	$('.temporal').remove();
	let domicilio = $('#domicilio');
	if(domicilio.val() ==''){
		$(domicilio).after('<span class="error-domicilio">Debes ingresar tu domicilio</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-domicilio').addClass('has-error has-feedback');
		$('#group-domicilio').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-domicilio').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-domicilio').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-domicilio span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}
	
	return correcto;
}



