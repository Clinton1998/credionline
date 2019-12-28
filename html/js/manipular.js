function enviarFormularioDatosPersonales(){

	let _dni = $('#dni').val();
	let _nombres = $('#nombres').val();
	let _apellidoPaterno  = $('#apellidoPaterno').val();
	let _apellidoMaterno = $('#apellidoMaterno').val();
	let _email = $('#correo').val()
	let _telefono = $('#telefono').val();

	$.ajax({
		type: 'post',
		url: '/registrar_cliente/',
		data: {
			opcion: 'primero',
			dni: _dni,
			nombres: _nombres,
			apellidoPaterno: _apellidoPaterno,
			apellidoMaterno: _apellidoMaterno,
			email: _email,
			telefonoMovil: _telefono
		},
		success: function(data){
			if(data.existe_dni){
				$('#dni').after('<span class="error-dni text-justify" style="font-size: 20px;">Parece que ya te has registrado con ese DNI. Intenta iniciar sesión</span>');
				limpiarFormularDatosPersonales();
				$('#dni').focus();
				$('#btn-siguiente-iniciar').hide().slideDown(1000);
				
				//alert('Alguien utilizo tu DNI intenta iniciar session');
			}else if(data.existe_email){
				$('#correo').after('<span class="error-email text-justify" style="font-size: 20px;">Parece que ya te has registrado con ese EMAIL. Intenta iniciar sesión</span>');
				limpiarFormularDatosPersonales();
				$('#correo').focus();
				$('#btn-siguiente-iniciar').hide().slideDown(1000);
			}else{
				//console.log('Registrado correctamente');
				colocarFormulariosDatosPersonalesSecundarios(_nombres,data[0].nCodigo);
				//$('#nombreCliente').text(_nombres);
			}
			
		
		}
	});


}
function limpiarFormularDatosPersonales(){

	$('div[id^="group"]').removeClass('has-error has-success');
	$('.temporal').remove();
	$('#dni').val('');
	$('#nombres').val('');
	$('#apellidoPaterno').val('');
	$('#apellidoMaterno').val('');
	$('#correo').val('');
	$('#telefono').val('');


}
function enviarFormularioDatosPersonalesSecundarios(){

	let _distrito = $('#distrito').val();
	let _domicilio = $('#domicilio').val();
	let _codigoCliente = parseInt($('#codigoCliente').val());

	$.ajax({
		type: 'post',
		url: '/registrar_cliente/',
		data: {
			opcion: 'segundo',
			codigoDistrito: _distrito,
			codigoCliente: _codigoCliente,
			domicilio: _domicilio
		},
		success: function(data){
			//console.log(data);
			
		}
	});
}

function buscarEmpresa(){
	
	let _ruc = $('#ruc').val();
	$.ajax({
		type: 'post',
		url: '/buscarempresa/',
		data: {
			ruc: _ruc
		},
		success: function(data){
			//console.log(data);
			$('#codigoEmpresa').val(data[0].nCodigo);
			$('#nombreEmpresa').val(data[0].cNombre);
			$('#salario').removeAttr('disabled').attr('enabled','true');
		}
	});
}

function buscarEmpresaModificacion(){
	
	let _ruc = $('#modRuc').val();
	$.ajax({
		type: 'post',
		url: '/buscarempresa/',
		data: {
			ruc: _ruc
		},
		success: function(data){
			//console.log(data);
			$('#codigoEmpresa').val(data[0].nCodigo);
			$('#modNombreEmpresa').val(data[0].cNombre);
			//$('#salario').removeAttr('disabled').attr('enabled','true');
		}
	});
}

//esta funcion nos servira para ver si la empresa elegida en el forulario
//de datos laborales tiene un estado vigente con CREDIONLINE
//si lo tiene recien haremos el proceso de scoring

function verificarEstadoDeConvenio(){
	//Necesitaremos el codigo de la empresa para verificar el estado
	let _codigoEmpresa = $('#codigoEmpresa').val();
	let _nombreEmpresa = $('#nombreEmpresa').val();

	$.ajax({
		type: 'post',
		url: '/consultar_estado_empresa/',
		data: {
			codigoEmpresa: _codigoEmpresa
		},
		success: function(data){
			//si el estado de la empresa es vigente
			if(data.estado.vigente){
				//aqui recien mostramos el otro tab(condiciones para proceder con el scoring)
				enviarFormularioDatosLaborales();
				colocarPestanaConvenio();
			}else{
				//Eliminaremos al cliente ya registrado ya que fallo en dar los datos laborales
				eliminarCliente();
				let mensaje = `
					<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="alert alert-danger" id="alert-solicitud-pendiente"  style="margin-top: 50px;">
							<span>NO ES POSIBLE HACER LA SOLICITUD</span><br>
							La empresa ${_nombreEmpresa} no tiene convenio vigente con CREDIONLINE.<br>
							<p><a href="/" style="font-size: 30px;">Ir a inicio</a></p>
						</div>
					</div>
				</div>
				`;
				$('#contenedorImagenFondoLaborales').html(mensaje);
			}
		},
		error: function(error){
			console.log('Error en la peticion POST: ',error);
		}
	});
}
function eliminarCliente(){
	let _codigoCliente = $('#infoCodigoCliente').text();
	$.ajax({
		type: 'post',
		url: '/eliminar_cliente/',
		data: {
			codigoCliente: _codigoCliente
		},
		success: function(data){
			console.log(data);
		},
		error: function(error){
			console.log('Error en peticion POST: ',error);
		}
	});
}

function enviarFormularioDatosLaborales(){
	let _codigoCliente = $('#codigo_cliente').val();
	let _codigoEmpresa = $('#codigoEmpresa').val();
	let _salario = $('#salario').val();

	$.ajax({
		type: 'post',
		url: '/registrar_trabajador/',
		data: {
			codigoCliente: _codigoCliente,
			codigoEmpresa: _codigoEmpresa,
			salario: _salario
		},
		success: function(data){
			console.log(data);
		},
		error: function(error){
			console.log('Error de peticion POST: ',error);
		}
	});

}

function enviarDatosUsuario(){
	let _codigoCliente = parseInt($('#infoCodigoCliente').text());
	let _infoCorreo = $('#infoCorreo').text();

	let _campoCorreo = $('#correoCredi').val();

	let _contrasenaCredi = $('#contrasenaCredi').val();
	let _repiteContrasenaCredi = $('#repiteContrasenaCredi').val();

	if(_infoCorreo==_campoCorreo){
		$.ajax({
			type: 'post',
			url: '/registrar_usuario/',
			data: {
				codigoCliente: _codigoCliente,
				contrasena:_contrasenaCredi,
				repiteContrasena: _repiteContrasenaCredi
			}
		});
	}else{
		console.log('Hubo un error intente de nuevo');
	}
}

function login(opcion=false){
	$('#resultadoLogin').remove();
	$('.temporal').remove();
	let _email = $('#emailLogin').val();
	let _contrasena = $('#contrasenaLogin').val();

	$.ajax({
		type: 'post',
		url: '/login/',
		data: {
			email: _email,
			contrasena: _contrasena
		},
		success: function(data){
			if(data.correcto && opcion==false){
				window.location.href = '/admin';
			}else if(data.correcto && opcion){
				verificarSolicitudPendiente(true);
			}
			else{
				//console.log('email o contraseña incorrecta');
				//console.log('Entro al else');
				$('#group-contrasenaLogin').after('<div class="alert alert-danger" id="resultadoLogin"></div>');
				$('#resultadoLogin').text('Correo o contraseña incorrecta');
				$('#emailLogin').val('');
				$('#contrasenaLogin').val('');
				$('#emailLogin').focus();
				$('#group-emailLogin').removeClass('has-success');
				$('#group-contrasenaLogin').removeClass('has-success');
			}
		},
		error: function(error){
			console.log('Ocurro un error en la peticion: '+error);
		}
	});
}

function enviarMontoPlazo(){
	let _codigoCliente = parseInt($('#infoCodigoCliente').text());
	let _monto = $('#montoSolicitado_info').val();
	let _plazo = $('#plazoSolicitado_info').val();
	let _destino = $('#infoDestino').text();

	$.ajax({
		type: 'post',
		url: '/registrar_monto_plazo/',
		data: {
			codigoCliente: _codigoCliente,
			monto: _monto,
			plazo: _plazo,
			destino: _destino
		},
		success: function(data){
			/*TEMPORAL*/
			console.log('Se registró el monto: Lo datos devueltos son: ');
			console.log(data);
			$('#infoCodigoSolicitud').val(data[0].nCodigo);
		},
		error: function(error){
			console.log('Hubo un error: '+error);
		}
	});
}

function enviarDatosDesembolso(){
	let _codigoSolicitud = $('#infoCodigoSolicitud').val();

	let _banco = $('#banco').val();
	let _tipoCuenta = $('#tipoDeCuenta').val();
	let _numeroCuenta = $('#numeroDeCuenta').val();

	$.ajax({
		type: 'post',
		url: '/registrar_datos_desembolso/',
		data: {
			codigoSolicitud: _codigoSolicitud,
			banco: _banco,
			tipoCuenta: _tipoCuenta,
			numeroCuenta: _numeroCuenta
		},
		success: function(data){
			console.log(data);
		},
		error: function(error){
			console.log('Ocurrio error: '+error);
		}
	});

}
function actualizarDatosDeFormularioModificacion(){
	let _codigoCliente = $('#modnCodigo_cliente').val();
	let _telefono = $('#modTelefonoMovil').val();
	let _codigoDistrito = $('#distrito').val();
	let _domicilio = $('#modDomicilio').val();

	let _codigoTrabajador = $('#modnCodigo_trabajador').val();
	let _codigoEmpresaAntiguo = $('#codigoEmpresaAntiguo').val();
	let _codigoEmpresaNuevo = $('#codigoEmpresa').val();
	let _salario = $('#modSalario').val();

	$.ajax({
		type: 'post',
		url: '/actualizar_datos_form_modificacion/',
		data: {
			codigoCliente: _codigoCliente,
			telefono: _telefono,
			codigoDistrito: _codigoDistrito,
			domicilio: _domicilio,
			codigoTrabajador: _codigoTrabajador,
			codigoEmpresaAntiguo: _codigoEmpresaAntiguo,
			codigoEmpresaNuevo: _codigoEmpresaNuevo,
			salario: _salario
		},
		success: function(data){
			if(data.correcto){
				colocarPestanaCondiciones();
			}
			console.log(data);
		},
		error: function(error){
			console.log('Hubo un error en la peticion',error);
		}
	});

}

function hacerScoring(){
	let _codigoCliente = $('#infoCodigoCliente').text();
	$.ajax({
		type: 'post',
		url: '/scoring/',
		data: {
			codigoCliente: _codigoCliente
		},
		success: function(data){
			let myHtml = ``;
			let nombreCliente = $('#infoNombreCliente').text();

			if(data.aprobado){
				myHtml = `<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="alert alert-success" id="alert-scoring-exito"  style="margin-top: 30px;">
							<span>RESULTADOS DE VERIFICACION</span><br>
							<span style="color: black;">SOLICITUD: APROBADA</span><br>
							Estimado(a) ${nombreCliente} cumples con los requisitos de préstamos en CREDIONLINE<br>
							Muy bien a continuacion dale siguiente
							<div class="form-group">
							<button type="button" class="btn btn-success btn-lg" id="btn-siguiente-scoring">Siguiente</button>
							</div>
						</div>
					</div>
				</div>`;
				$('#contenedorScoring').html(myHtml);
				$('#btn-siguiente-scoring').on('click',function(){
					colocarPestanaCondiciones();
				});

			}else{
				myHtml = `
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="alert alert-danger" id="alert-scoring-sinExito"  style="margin-top: 30px;">
							<span>RESULTADOS DE VERIFICACION</span><br>
							<span style="color: black;">SOLICITUD: DESAPROBADA</span><br>
							Estimado(a) ${nombreCliente} NO cumples con los requisitos de préstamos en CREDIONLINE<br>
							Te recomendamos revisar tus datos ingresados e intentarlo de nuevo
							<div class="form-group">
							<a href="/" class="btn btn-danger btn-lg">Ir a inicio</a>
							</div>
						</div>
					</div>
				</div>
				`;
				$('#contenedorScoring').html(myHtml);
			}
			

		},
		error: function(error){
			console.log('Error en peticion POST: ',error);
		}
	});
}
/*
function subirDocumentos(){
	//var formData = new FormData(document.getElementById('formularioDocumentos'));
	/*formData.append('descuento',$('#file-upload-descuento').files[0]);
	formData.append('dni',$('#file-upload-dni').files[0]);
	formData.append('boleta',$('#file-upload-boleta').files[0]);*/
	/*
	$.ajax({
			url: '/upload/',
			type: 'post',
			data: [$('#file-upload-descuento').val(),$('#file-upload-dni').val(),$('#file-upload-boleta').val()],
			cache: false,
			contentType: false,
			processData: false,
			success: function(data){
				console.log('Los datos recibidos es: ');
				console.log(data);
			},
			error: function(error){
				console.log('Error en la peticion: ',error);
			}
	});
    
}*/