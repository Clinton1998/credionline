function validarArchivos(){
	let todoLosCamposCorrectos = true

	todoLosCamposCorrectos = validarCampoDescuento();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarCampoCopiaDni();
	if(!todoLosCamposCorrectos){return false}

	todoLosCamposCorrectos = validarCampoBoleta();
	if(!todoLosCamposCorrectos){return false}

	return todoLosCamposCorrectos;

}
function validarCampoDescuento(){
	let correcto = true;
	$('.error-file-upload-descuento').remove();
	
	let fileUploadDescuento = $('#file-upload-descuento');
	if(fileUploadDescuento.val() ==''){
		$(fileUploadDescuento).after('<span class="error-file-upload-descuento">Sube un documento</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-file-upload-descuento').addClass('has-error');
		
	}else{
		
		$('#group-file-upload-descuento').removeClass('has-error').addClass('has-success has-feedback');
	}

	return correcto;
}

function validarCampoCopiaDni(){
	let correcto = true;
	$('.error-file-upload-dni').remove();
	
	let fileUploadDni = $('#file-upload-dni');
	if(fileUploadDni.val() ==''){
		$(fileUploadDni).after('<span class="error-file-upload-dni">Sube un documento</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-file-upload-dni').addClass('has-error');
		
	}else{
		
		$('#group-file-upload-dni').removeClass('has-error').addClass('has-success has-feedback');
	}

	return correcto;
}

function validarCampoBoleta(){
	let correcto = true;
	$('.error-file-upload-boleta').remove();
	
	let fileUploadBoleta = $('#file-upload-boleta');
	if(fileUploadBoleta.val() ==''){
		$(fileUploadBoleta).after('<p class="error-file-upload-boleta">Sube un documento</p>');
		correcto = false;
	}
	if(!correcto){
		$('#group-file-upload-boleta').addClass('has-error');
		
	}else{
		
		$('#group-file-upload-boleta').removeClass('has-error').addClass('has-success has-feedback');
	}

	return correcto;
}
