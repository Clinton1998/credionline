$(document).ready(function(){
	//Para mostrar la barra de navegacion
	cargarNavBar('#navbar');
	//Funcion para traer los datos de inicio de session
	traerDatosSession();
	//para mostrar el contenido principal
	cargarMain('#main');
	//para mostrar el pie de pagina
	cargarFooter('#footer');
});

//Esta funcion nos sirve para la manipulacion de Subida de archivos
function cambiarUploadDescuento(){
    var pdrs = document.getElementById('file-upload-descuento').files[0].name;
    document.getElementById('info-descuento').innerHTML = pdrs;
}

function cambiarUploadDni(){
    var pdrs = document.getElementById('file-upload-dni').files[0].name;
    document.getElementById('info-dni').innerHTML = pdrs;
}

function cambiarUploadBoleta(){
    var pdrs = document.getElementById('file-upload-boleta').files[0].name;
    document.getElementById('info-boleta').innerHTML = pdrs;
}



/*Funcion que evita que se pierdan los datos rellenados en un formulario. Esta
funcion se activa al presionar F5, cuando estamos rellenando*/
function aumentarAnchoBarraProgreso(cantidad){
	$('#anchoBarraProgreso').attr('style','width: '+cantidad+'%');
	$('#anchoBarraProgreso').text(cantidad+'%');
}

function evitarRecargarPagina(){
	 	document.onkeydown = function(e){
 	tecla = (document.all) ? e.keyCode : e.which;
 	//alert(tecla)
 	
 	//Condicional que verifica que se haya presionado F5 y ademas que hayga datos
 	if (tecla == 116){
   	if (confirm("¿Seguro que quieres refrescar la página?\nHay datos que podrian no guardarse") == true) {
      window.location = 'index.html';
    } else {
      return false;
   }
 }
}
}


function comprobarSession(){
	$.ajax({
		type: 'post',
		url: '/existesession',
		success: function(data){
			if(!data.existe){
				colocarPestanaValidacion();
			}else{
				colocarPestanaFinalizacion();
			}
		},
		error: function(error){
			console.log('Error en la peticion: ',error);
		}
	});
}

function colocarTabs(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs.html',
		success: function(data){
			$('#main').html(data);
		}
	});
}
function cargarMain(selector){
	$.ajax({
		type: 'GET',
		url:'plantillas/main.html',
		success: function(data){
			$(selector).html(data);

			//Aplicamos el evento para el boton solicitar
			$(".btn-solicitar").on('click',function(){
				colocarTabs();
				colocarPestanaMontos();

			})
		}
	});
}

function cargarFooter(selector){
	$.ajax({
		type: 'GET',
		url:'plantillas/footer.html',
		success: function(data){
			$(selector).html(data);
			//Funcion para traer los datos de inicio de session
			traerDatosSession();
		}
	});
}

function cargarNavBar(selector){
	$.ajax({
		type: 'GET',
		url:'plantillas/navbar.html',
		success: function(data){
			$(selector).html(data);
			$('#btn-iniciar-sesion').on('click',function(){
				let estado = validarFormularioLogin();

				if(estado){
					if($('#btn-siguiente-iniciar').attr('class')=='btn btn-primary btn-lg otro'){
						login(true);
					}else{
						login();
					}
					
				}else{
					console.log('Datos incorrectos');
				}
			});

			$('#btn-buscar').on('click',function(){
				alert('Boton buscar');
			});

			//Para refrescar el modal cuando se cierre
			$('#myModal').on('hidden.bs.modal', function (e) {
	    		$('#emailLogin').val('');
				$('#contrasenaLogin').val('');
				$('span[class^="error"]').remove();
				$('.temporal').remove();
				$('div[id^="group"]').removeClass('has-error has-success');

			});

		}
	});
}
function verificarSessionEnFormularioFront(){
	console.log('Entro a la funcion del frontend');
	//aqui verificamos la session en el backend si ya esta logueado
	$.ajax({
		type: 'post',
		url: '/estalogueado/',
		success: function(data){
			if(data.estalogueado){
				verificarSolicitudPendiente();
			}
			if(data.continua){
				//Mostramos los formularios de registro normalmente
				colocarFormularioDatosPersonales();
			}
		},
		error: function(error){
			console.log('Hubo un error: ',error);
		}
	});
}

function verificarSolicitudPendiente(opcion=false){
	$.ajax({
		type: 'post',
		url: '/consultar_solicitud_pendiente/',
		success: function(data){
			if(data.pendiente){
				let myHtml = `
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="alert alert-danger" id="alert-solicitud-pendiente"  style="margin-top: 50px;">
							<span>NO ES POSIBLE HACER LA SOLICITUD</span><br>
							Estimado usuario tu solicitud anterior aún esta en proceso de verificación.<br>
							<p id="recomendacionsolicitud">Ingresa al <a href="/admin">panel de administración</a> para ver más detalles.</p>
						</div>
					</div>
				</div>
				`;
				if(opcion){
					$('#fondoDatosPersonales').html(myHtml);
					$('#myModal').modal('hide');
					$('#myModal').removeData();
					$('#myModal').data('modal', null);
					$('#tabMensajeMonto,#tabMensaje').addClass('hidden');
					$('#tabCambia').removeClass('col-md-6').addClass('col-md-12');

				}else{
					$('#contenedorImagenFondoMontos').html(myHtml);
				}
				
			}else{
				colocarFormularioModificacion();
				///Traer datos para la modificacion
				traerDatosDeModificacion();
				if(opcion){
					$('#myModal').modal('hide');
					$('#myModal').removeData();
					$('#myModal').data('modal', null);
				}
			}

			traerDatosSession();
		},
		error: function(error){
			console.log(error);
		}
	});
}
function traerDatosDeModificacion(){
	$.ajax({
		type: 'post',
		url: '/consultar_datos_modificacion',
		success: function(data){
			let _telefonoMovil = data[0][0].cTelefono;
			let _domicilio = data[0][0].cDomicilio;
			let _salario = data[1][0].nSalario;
			let _nombreEmpresa = data[2][0].cNombre;
			let _ruc = data[2][0].cRuc;
			let _departamento = data[5].departamento
			let _provincia = data[4].provincia;
			let _distrito = data[3].distrito;
			let _codigoDistrito = data[3].nCodigo_distrito;
			let _codigoCliente = data[0][0].nCodigo;
			//Mostramos los datos en el formulario
			$('#infoCodigoCliente').text(_codigoCliente);
			$('#modnCodigo_cliente').val(_codigoCliente);
			$('#modnCodigo_trabajador').val(data[1][0].nCodigo);
			$('#codigoEmpresa').val(data[2][0].nCodigo);
			$('#codigoEmpresaAntiguo').val(data[2][0].nCodigo);
			$('#modTelefonoMovil').val(_telefonoMovil);
			/*
			$('#modDepartamento').val(_departamento);
			$('#modProvincia').val(_provincia);
			$('#modDistrito').val(_distrito);*/
			//Mostramos su ubicacion actual
			
			$('#provincia').html(`<option value="">${_provincia}</option>`);
			$('#distrito').html(`<option value="${_codigoDistrito}">${_distrito}</option>`);

			traerDepartamentos();
			$('#departamento').html(`<option value="temp" id="optionEliminar">${_departamento}</option>`);
			//traerProvincias();
			//traerDistritos();

			$('#modDomicilio').val(_domicilio);
			$('#modSalario').val(_salario);
			$('#modNombreEmpresa').val(_nombreEmpresa);
			$('#modRuc').val(_ruc);

			//Mostramos los datos del usuario en una tabla
			$('#tdModTelefonoMovil').text(_telefonoMovil);
			$('#tdModDepartamento').text(_departamento);
			$('#tdModProvincia').text(_provincia);
			$('#tdModDistrito').text(_distrito);
			$('#tdModDomicilio').text(_domicilio);
			$('#tdModRuc').text(_ruc);
			$('#tdModNombreEmpresa').text(_nombreEmpresa);
			$('#tdModSalario').text('S/. '+_salario);
			$('#infoEstaLogeado').text('si');
			$('#infoNombreCliente').text(data[0][0].cNombres);
			establecerEventoParaCamposPersonalesSecundarios();
			console.log(data);
		},
		error: function(error){
			console.log('Ocurrio un error: ',error);
		}
	})
}
function colocarFormularioModificacion(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/modificacion.html',
		success: function(data){
			$('#elementoVariable').html(data);
			$('#tabVariable a').text('Modificacion');
			$('#tabMensajeMonto').removeClass('hidden');
			$('#tabMensaje').addClass('hidden');
			$('#tabCambia').removeClass('col-md-6').addClass('col-md-9');

			establecerEventoParaCamposModificacion();
			$('#respuestaAPregunta').hide();
			$('#btn-respuesta-si').on('click',function(){
				//eliminamos la columna de la pregunta
				$('#contenidoParaFormulario').hide();
				//$('#respuestaAPregunta').fadeIn(500).show();
				$('#respuestaAPregunta').slideDown('slow');
			});
			$('#btn-respuesta-no').on('click',function(){
				colocarPestanaCondiciones();
			});

			$('#btn-cancelar-modificacion').on('click',function(){
				$( "#respuestaAPregunta" ).hide();
				$('#contenidoParaFormulario').show();
				//Mostramos los datos en el formulario
				$('#modTelefonoMovil').val($('#tdModTelefonoMovil').text());
				/*
				$('#modDepartamento').val(_departamento);
				$('#modProvincia').val(_provincia);
				$('#modDistrito').val(_distrito);*/
				$('#modDomicilio').val($('#tdModDomicilio').text());
				$('#modSalario').val($('#tdModSalario').text().substring(4));
				$('#modNombreEmpresa').val($('#tdModNombreEmpresa').text());
				$('#modRuc').val($('#tdModRuc').text());

				//Para quitar los estilos de Bootstrap aplicados en los input
				$('span[class^="error-"]').remove();
				$('.temporal').remove();
				$('div[id^="group"]').removeClass('has-error has-success');
				//***********************************************************

			});
			$('#btn-modificar-modificacion').on('click',function(){
				let estado = validarFormularioModificion();
				if(estado){
					//colocarPestanaCondiciones();
					actualizarDatosDeFormularioModificacion();
				}
			})
			/*
			$('#btn-saltar-modificacion').on('click',function(){
				colocarPestanaCondiciones();
			});
			$('#btn-modificar-modificacion').on('click',function(){
				let estado = validarFormularioModificion();
				if(estado){
					colocarPestanaCondiciones();
				}
			});*/

			//Mas cosas
		},
		error: function(error){
			console.log('Error en la peticion: ',error);
		}
	});
}
function colocarFormularioDatosPersonales(){

	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/datospersonales.html',
		success: function(data){
			$('#elementoVariable').html(data);
				/*window.onbeforeunload = function() {
  				return "¿Desea recargar la página web?";
			};*/
			establecerEventoParaCamposPersonales();
			$('#tabVariable a').text('Datos personales');
			$('#dni').focus();
		
			$('#tabMensaje,#tabMensajeMonto').removeClass('hidden');
			$('#tabCambia').removeClass('col-md-12').addClass('col-md-6');

			//window.onbeforeunload = null;
			$('#btn-siguiente-datos-personales').on('click',function(){
				
				let estado = validarFormularioDatosPersonales();
				//estado = true;
				if(estado){
					$('#infoNombreCliente').text($('#nombres').val());
					$('#infoCorreo').text($('#correo').val());
					enviarFormularioDatosPersonales();
				}
			});
			$('#btn-siguiente-iniciar').on('click',function(){
				$('#btn-siguiente-iniciar').addClass('otro');
				establecerEventoParaCamposLogin();
			});
		}
	});
}

/**************************************/
function traerDepartamentos(){
	$.ajax({
		type: 'post',
		url: '/departamentos/',
		dataType: 'json',
		success: function(data){
			//console.log(data);
			let as = '';
			for(let i=0; i<data.length; i++){
				as = ('<option value="'+data[i].nCodigo+'">'+data[i].cNombre+'</option>');
				$('#departamento').append(as);
			}
			
		},
		error: function(){
			console.log('Hubo un error: ',error);
		}
	});
}

function traerProvincias(nCodigo_departamento){
		//$('.carga_provincias').remove();
		$.ajax({
		type: 'post',
		url: '/provincias/',
		data: {
			nCodigo_depar: nCodigo_departamento
		},
		dataType: 'json',
		success: function(data){
			//console.log(data);
			let as = '';
			for(let i=0; i<data.length; i++){
				as += ('<option class="carga_provincias" value="'+data[i].nCodigo+'">'+data[i].cNombre+'</option>');
			}
			$('#provincia').html(as);
			validarProvincia();
		}

	});
}

function traerDistritos(nCodigo_provincia){
		//$('.carga_distritos').remove();
		$.ajax({
		type: 'post',
		url: '/distritos/',
		data: {
			nCodigo_prov: nCodigo_provincia
		},
		dataType: 'json',
		success: function(data){
			//console.log(data);
			
			let as = '';
			for(let i=0; i<data.length; i++){
				as += ('<option class="carga_distritos" value="'+data[i].nCodigo+'">'+data[i].cNombre+'</option>');
			}
			$('#distrito').html(as);
		}

	});
}

function colocarFormulariosDatosPersonalesSecundarios(_nombrecliente,_codigoCliente){
	
	//traerProvincias();
	//traerDistritos();
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/datospersonalessecudario.html',
		success: function(data){
			$('#elementoVariable').html(data);
			establecerEventoParaCamposPersonalesSecundarios();
			$('#tabVariable a').text('Tu ubicación');
			$('#codigoCliente').val(_codigoCliente);

			//$('#departamento').focus();
			$('#nombreCliente').text(_nombrecliente);
			$('#btn-siguiente-datos-personales-secundarios').on('click',function(){
				let estado = validarFormulariosDatosPersonalesSecundarios();
				//estado = true;
				if(estado){
					enviarFormularioDatosPersonalesSecundarios();
					let codigoCliente = $('#codigoCliente').val();
					colocarFormularioDatosLaborales(codigoCliente);
				}
			});
		}
	});
	traerDepartamentos();
}
function colocarFormularioDatosLaborales(codigoCliente){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/datoslaborales.html',
		success: function(data){
			$('#elementoVariable').html(data);
			establecerEventoParaCamposLaborales();
			$('#tabVariable a').text('Datos laborales');
			$('#codigo_cliente').val(codigoCliente);
			$('#ruc').focus();

			//kddjdjjdj
			$('#btn-siguiente-datos-laborales').on('click',function(){
				let estado = validarFormularioDatosLaborales();
				//estado = true;
				if(estado){
					$('#infoCodigoCliente').text(codigoCliente);
					verificarEstadoDeConvenio();
				}
			});
		}
	});
}

function colocarPestanaConvenio(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/convenio.html',
		success: function(data){
			$('#elementoVariable').html(data);
			$('#tabVariable a').text('Scoring');
			$('#tabMensaje').addClass('hidden');
			$('#tabCambia').removeClass('col-md-6').addClass('col-md-9');
			hacerAnimacion();
		}
	});
}

//Metodo para averiguar si acepta las condiciones del credito
function aceptaCondiciones(){
	//true-->si acepta
	//false-->no acepta
	$('#chkAceptoCondiciones').change('click',function(){
		let valor = $(this).is(':checked');
		if(!valor){
			$('#btn-siguiente-condiciones').attr('disabled',true);
		}else{
			$('#btn-siguiente-condiciones').attr('disabled',false);
		}
	});
}
function colocarPestanaMontos(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/montos.html',
		success: function(data){
			$('#elementoVariable').html(data);
			establecerEventoParaCamposMontos();
			$('#monto').focus();
			//Para habilitar los toolstips aplicados con Bootstrap
			$('[data-toggle="tooltip"]').tooltip();
			$('#tabCambia').removeClass('col-md-6').addClass('col-md-12');
			$('#btn-siguiente-verificacion').on('click',function(){

				let estado = validarFormularioMontos();
				//estado = true;
				if(estado){
					let montoSolicitado = $('#monto').val();
					let totalAPagar = calcularMontos(true);
					let interes = calcularMontos(false,true);
					let subTotal = calcularMontos(false,false,true);
					let iva = calcularMontos(false,false,false,true);
					let plazo = $('#plazo').val();
					let destino = $('#destino').val();

					/***********************************/
					$('#infoMontoSolicitado').text('S/. '+montoSolicitado);
					$('#infoTotalAPagar').text('S/. '+totalAPagar);
					$('#infoInteres').text('S/. '+interes);
					$('#infoSubTotal').text('S/. '+subTotal);
					$('#infoIva').text('S/. '+iva);
					$('#infoDestino').text(destino);
					
					$('#montoSolicitado_info').val(montoSolicitado);
					$('#plazoSolicitado_info').val(plazo);
					//cuando guardamos los datos recien verificamos
					verificarSessionEnFormularioFront();

				}
			});
		}
	});
}
function colocarPestanaCondiciones(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/condiciones.html',
		success: function(data){

			$('#elementoVariable').html(data);
			$('#tabVariable a').text('Condiciones');
			$('#tabMensajeMonto').addClass('hidden');
			$('#tabMensaje').addClass('hidden');

			//aqui mostramos los monto que el cliente seleciono anteriormente
			$('#infMontoSolicitado').text($('#infoMontoSolicitado').text());
			$('#infInteres').text($('#infoInteres').text());
			$('#infSubTotal').text($('#infoSubTotal').text());
			$('#infIva').text($('#infoIva').text());
			$('#infTotalAPagar').text($('#infoTotalAPagar').text());
			$('#nombreCliente').text($('#infoNombreCliente').text());

			$('#tabCambia').removeClass('col-md-9').addClass('col-md-12');
			aceptaCondiciones();
			
			$('#btn-siguiente-condiciones').on('click',function(){
				
				/*aqui registraremos los montos*/
				enviarMontoPlazo();
				//otro tab
				colocarPestanaDocumentos();

			});
		}
	});
}

function colocarPestanaDocumentos(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/documentos.html',
		success: function(data){
			$('#elementoVariable').html(data);
			$('#tabVariable a').text('Documentos');
			$('#tabMensajeMonto').removeClass('hidden');
			$('#tabCambia').removeClass('col-md-6').addClass('col-md-9');
			//Cargamos el contenedor para arrastrar nuestros documentos
			$('#btn-siguiente-documentos').on('click',function(){
				let estado = validarArchivos();
				//estado = true;
				if(estado){
					//subirDocumentos();
					colocarPestanaDesembolso();
				}
			});
		}
	});
}

function colocarPestanaDesembolso(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/desembolso.html',
		success: function(data){
			$('#elementoVariable').html(data);
			$('#tabVariable a').text('Desembolso');
			establecerEventoParaCamposDesembolso();
			$('#tabMensaje').removeClass('hidden');
			$('#tabCambia').removeClass('col-md-9').addClass('col-md-6');
			$('#btn-siguiente-desembolso').on('click',function(){
				let estado = validarFormularioDesembolso();

				//tambien verificaremos si ya existe session del usuario
				//para darle un camino en el proceso
				if(estado){
					enviarDatosDesembolso();
					comprobarSession();
				}
			});
		}
	});
}
function colocarPestanaValidacion(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/validacion.html',
		success: function(data){
			$('#elementoVariable').html(data);
			$('#tabVariable a').text('Validación');
			$('#tabMensajeMonto').addClass('hidden');
			$('#tabCambia').removeClass('col-md-6').addClass('col-md-9');
			establecerEventoParaCamposValidacion();
			$('#contrasenaCredi').focus();
			$('#correoCredi').val($('#infoCorreo').text());
			$('#sCorreo').text($('#infoCorreo').text());

			$('#btn-siguiente-validacion').on('click',function(){
				let estado = validarFormularioCuentaCredi();
				if(estado){
					enviarDatosUsuario();
					colocarPestanaFinalizacion();
				}

			});
		}
	});
}

function colocarPestanaFinalizacion(){
	$.ajax({
		type: 'GET',
		url: 'plantillas/tabs/finalizacion.html',
		success: function(data){
			$('#elementoVariable').html(data);
			$('#tabVariable a').text('Finalización');
			$('#tabMensaje,#tabMensajeMonto').addClass('hidden');
			let mensaje = '';
			let boton = ``;

			if($('#infoEstaLogeado').text()=='si'){
				//Mostramos un contenido para los logeados
				$('#tabCambia').removeClass('col-md-6').addClass('col-md-12');
				mensaje = `Muy bien solicitaste otra vez el credito, puedes verificar tus datos en el panel de administración.`;
				boton = `<a href="/admin" class="btn btn-success btn-primary btn-lg" id="btn-siguiente-finalizacion">Ir al panel de administración</a>`;

				$('#botonEnFinalizacion').html(boton);
			}else{
				//Mostramos otro contenido para los que recien se registraron
				$('#tabCambia').removeClass('col-md-9').addClass('col-md-12');
				mensaje = `A continuacion ingresa a tu cuenta credionline con tus credenciales email y contraseña.
				Tendras una pagina para administrar tus datos. Gracias.`;
				boton = `<button type="button" class="btn btn-success btn-primary btn-lg" id="btn-siguiente-finalizacion"
				data-toggle="modal" data-target="#myModal">Ingresar a mi cuenta</button>`;
				establecerEventoParaCamposLogin();
			}
			$('#mensajefinalizacion').text(mensaje);
			$('#botonEnFinalizacion').html(boton);
			
		}
	});
}


function traerDatosSession(){
	$.ajax({
		type: 'post',
		url: '/estalogueado/',
		data: {
			masdatos: true	
		},
		success: function(data){
			let resutado = '';
			if(data.continua){
				resultado = `<button type="button" onClick="establecerEventoParaCamposLogin()"
				 data-toggle="modal" data-target="#myModal"
				 class="btn btn-primary" id="btn-ingresar">
				 <span class="glyphicon glyphicon-user"></span>Ingresar</button>`;
			}else{
			resultado = `<ul class="nav navbar-nav navbar-right">
				          <li class="dropdown">
				          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
				          <img src="/img/user.png" width="30" class="img-responsive" style="display: inline;">
				          <span id="nombreColor">${data[0].cNombres}</span>
				          <span class="caret"></span></a>
				          <ul class="dropdown-menu">
				          <li><a href="/admin">Admin</a></li>
				          <li><a href="/salir">Salir</a></li>
				          </ul>
				          </li> 
				          </ul>`;
			}
			$('#grupoCambiable').html(resultado);

		},
		error: function(error){
			console.log('Error en la peticion: ',error);
		}
	})
}
//Funcion para la amimacion del proceso de Scoring
function hacerAnimacion(){
	$('#contenedor-preloader').html(`<div class="preloader"></div>`);

	var cont = 1;
    var id = setInterval(function(){
        cont++;
        if(cont==10){
        	$('.texto-preloader').html('Finalizando...');
        }
        if(cont == 15){	
            clearInterval(id);
            //aqui detendremos la animacion y pasaremos a mostrar resultados
            //de scoring
            hacerScoring();
        }
       
    }, 1000); 
}




