/*function compruebaCCC(entidad,sucursal,dc,nCuenta){
	entidad = rellenaCeros(entidad,4);
	sucursal = rellenaCeros(sucursal,4);
	dc = rellenaCeros(dc,2);
	nCuenta = rellenaCeros(nCuenta,10);

	let concatenado = entidad+sucursal;
	let dc1 = calculaDCParcial(concatenado);
	let dc2 = calculaDCParcial(nCuenta);
	return (dc==(dc1+dc2));
}

function calculaDCParcial(cadena){
	let dcParcial = 0;
	let tablaPesos = [6,3,7,9,10,5,8,4,2,1];
	let suma = 0;
	let i;
	for(i=0;i<cadena.length;i++){
		suma = suma + cadena.charAt(cadena.length-1-i)*tablaPesos[i];
	}
	dcParcial = (11-(suma % 11));
	if(dcParcial==11)
		dcParcial=0;
	else if(dcParcial==10)
		dcParcial=1;
	return dcParcial.toString();
}

function rellenaCeros(numero,longitud){
	let ceros = '';
	let i;
	numero = numero.toString();
	for(i=0;(longitud-numero.length)>i;i++){
		ceros += '0';
	}	
	return ceros+numero;
}*/

function establecerEventoParaCamposDesembolso(){
	$('#banco').change(validarBanco);
	$('#tipoDeCuenta').change(validarTipoDeCuenta);
	$('#numeroDeCuenta').keyup(validarNumeroDeCuenta);
	
}

function validarFormularioDesembolso(){
	let todoLosCamposCorrectos = true
	todoLosCamposCorrectos = validarBanco();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarTipoDeCuenta();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarNumeroDeCuenta();
	if(!todoLosCamposCorrectos){return false}
	

	return todoLosCamposCorrectos;
}

function validarBanco(){
	let correcto = true;
	$('.error-banco').remove();
	
	let banco = $('#banco');
	if(banco.val() =='Seleccione'){
		$(banco).after('<span class="error-banco">Debes seleccionar el banco</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-banco').addClass('has-error');
		
	}else{
		
		$('#group-banco').removeClass('has-error').addClass('has-success has-feedback');
	}
	
	return correcto;
}

function validarTipoDeCuenta(){
		let correcto = true;
	$('.error-tipoDeCuenta').remove();
	
	let tipoDeCuenta = $('#tipoDeCuenta');
	if(tipoDeCuenta.val() =='Seleccione'){
		$(tipoDeCuenta).after('<span class="error-tipoDeCuenta">Seleccion el tipo de cuenta</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-tipoDeCuenta').addClass('has-error');
		
	}else{
		$('#group-tipoDeCuenta').removeClass('has-error').addClass('has-success has-feedback');
	}
	
	return correcto;
}

function validarNumeroDeCuenta(){
	let correcto = true;
	$('.error-numeroDeCuenta').remove();
	$('.temporal').remove();
	let numeroDeCuenta = $('#numeroDeCuenta');
	if(numeroDeCuenta.val() ==''){
		$(numeroDeCuenta).after('<span class="error-numeroDeCuenta">Ingresa tu numero de cuenta</span>');
		correcto = false;
	}else if(numeroDeCuenta.val().length!=13){
		$(numeroDeCuenta).after('<span class="error-numeroDeCuenta">Debe ser 13 digitos</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-numeroDeCuenta').addClass('has-error has-feedback');
		$('#group-numeroDeCuenta').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
	}else{
		$('#group-numeroDeCuenta').append('<span class="glyphicon glyphicon-remove form-control-feedback temporal"></span>');
		$('#group-numeroDeCuenta').removeClass('has-error').addClass('has-success has-feedback');
		$('#group-numeroDeCuenta span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
	}

	return correcto;
}
