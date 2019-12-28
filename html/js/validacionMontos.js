function controlarSoloNumeros(e) {
            tecla = (document.all) ? e.keyCode : e.which; 
            if (tecla==8) return true; // para la tecla de retroseso
            else if (tecla==0||tecla==9)  return true; //<-- PARA EL TABULADOR-> su keyCode es 9 pero en tecla se esta transformando a 0 asi que porsiacaso los dos
            patron =/[0-9\s]/;// -> solo letras
           // patron =/[0-9\s]/;// -> solo numeros
            te = String.fromCharCode(tecla);
            return patron.test(te); 
}
function establecerEventoParaCamposMontos(){
	$('#monto').keyup(validarMonto);
	$('#rangoMonto').on('input',colocarValorEnCampo);
	$('#plazo').change(seleccionarPlazo);
	$('#destino').change(validarDestino);
	$('#btn-agregarMonto').click(agregarMonto);
	$('#btn-quitarMonto').click(quitarMonto);
}

function validarFormularioMontos(){
	let todoLosCamposCorrectos = true
	//$('.error-ruc .error-nombreEmpresa').remove();
	todoLosCamposCorrectos = validarMonto();
	if(!todoLosCamposCorrectos){return false}
	todoLosCamposCorrectos = validarDestino();
	if(!todoLosCamposCorrectos){return false}

	return todoLosCamposCorrectos;


}
function validarMonto(){
	let correcto = true;
	$('.error-monto').remove();
	$('.temporal').remove();
	let monto = $('#monto');
	if(monto.val() ==''){
		$(monto).after('<span class="error-monto">Falta el monto</span>');
		correcto = false;
	}else if(monto.val()<3000){
		$(monto).after('<span class="error-monto">Debe ingresar como minimo 3000</span>');
			correcto = false;
	}else if(monto.val()>25000){
		$(monto).after('<span class="error-monto">El monto no puede superar 25000</span>');
			correcto = false;
	}
	if(!correcto){
		$('#group-monto').addClass('has-error has-feedback');
		
	}else{
		
		$('#group-monto').removeClass('has-error').addClass('has-success has-feedback');
		
	}

	if(correcto){
		$('#pMontoSolicitado').text('S/. '+monto.val());
		$('#pInteres #contenido').text('S/. ... ');
		calcularMontos();

	}else{
		$('#pMontoSolicitado').text('S/. ...');
		$('#pInteres #contenido').text('S/. ... ');
		$('#pSubTotal').text('S/. ...');
		$('#pIva').text('S/. ...');
		$('#pTotalAPagar').text('S/. ...');
	}
	

	return correcto;
}

function agregarMonto(){
	let antiguo = parseInt($('#monto').val());
	let nuevo = 0;
	if(!(antiguo==25000)){
		nuevo = antiguo + 1000;
	}else{
		nuevo = antiguo;
	}
	

	$('#monto').val(nuevo);
	calcularMontos();

	establecerEstadoBotones(nuevo);
}

function establecerEstadoBotones(cantidad){
	if(cantidad==25000){
		$('#btn-agregarMonto').attr('disabled','true');
	}else{
		$('#btn-agregarMonto').removeAttr('disabled').attr('enabled','true');
	}

	if(cantidad==3000){
		$('#btn-quitarMonto').attr('disabled','true');
	}else{
		$('#btn-quitarMonto').removeAttr('disabled').attr('enabled','true');	
	}
}

function quitarMonto(){
	let antiguo = parseInt($('#monto').val());
	let nuevo = 0;
	if(!(antiguo==3000)){
		nuevo = antiguo - 1000;
	}else{
		nuevo = antiguo;
	}
	
	
	$('#monto').val(nuevo);
	calcularMontos();

	establecerEstadoBotones(nuevo);
}

function validarDestino(){
	let correcto = true;
	$('.error-destino').remove();
	
	let destino = $('#destino');
	if(destino.val() =='seleccione'){
		$(destino).after('<span class="error-destino">Debes seleccionar el destino del credito</span>');
		correcto = false;
	}
	if(!correcto){
		$('#group-destino').addClass('has-error');
	}else{
		$('#group-destino').removeClass('has-error').addClass('has-success has-feedback');
	}

	return correcto;
}
function colocarValorEnCampo(){
	let valorDeRange = parseInt($('#rangoMonto').val());
	$('#monto').val((valorDeRange*1000));
	validarMonto();
	let nuevo = parseInt($('#monto').val());
	establecerEstadoBotones(nuevo);
}

function seleccionarPlazo(){
	if(validarMonto()){
		calcularMontos();
	}
}

function calcularMontos(_total=false,_interes=false,_subTotal=false,_iva=false){

	let monto = parseInt($('#monto').val());
	//monto = parseInt(monto.substring(4));
	let dias = parseInt($('#plazo').val());
	let destino = $('#destino');
	let interesMensual = 0.09;
	let interes = 0;

	for(let i=1; i<=dias/30;i++){
		interes += monto*interesMensual;
		monto  = monto + interes;
	}

	let subTotal = parseInt($('#monto').val())+interes;
	let iva = 0.18*subTotal;
	let totalAPagar = subTotal+iva;

	interes = Number(interes.toFixed(2));
	subTotal = Number(subTotal.toFixed(2));
	iva = Number(iva.toFixed(2));
	totalAPagar = Number(totalAPagar.toFixed(2));
	
	$('#pMontoSolicitado').text('S/. '+($('#monto').val()));
	$('#pInteres #contenido').text('S/. '+interes);
	$('#pSubTotal').text('S/. '+subTotal);
	$('#pIva').text('S/. '+iva);
	$('#pTotalAPagar').text('S/. '+totalAPagar);
	/*
	console.log('Monto: '+monto);
	console.log('Interes: '+interes);
	console.log('SubTotal: '+subTotal);*/
	if(_total){
		return totalAPagar;
	}

	if(_interes){
		return interes;
	}

	if(_subTotal){
		return subTotal;
	}

	if(_iva){
		return iva;
	}
}
