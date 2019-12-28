$(document).ready(function(){
	traerDatosSession(true);

	//Temporal

	//aqui evalaremos si el logeado es usuario normal o Administrador
	//dependiendo a eso mostraremos un contenido diferente
	preguntarTipoUsuarioLogeado();
});
function preguntarTipoUsuarioLogeado(){
	$.ajax({
		type: 'post',
		url: '/tipo_usuario_logueado/',
		success: function(data){
			if(data=='ADMINISTRADOR'){
				colocarPaginaAdministrador();
				colocarContadores('administrador');
				consultarContadoresAdministrador();
			}else{
				colocarPaginaSolicitante();
				colocarContadores('solicitante');
				consultarContadoresSolicitante();

			}
		},
		error: function(error){
			console.log('Error post: ',error);
		}
	});
}
function consultarContadoresSolicitante(){
	traerSolicitados();
	traerVigentes();
	//aqui ira mas funciones
}
function consultarContadoresAdministrador(){
	traerClientes();
	traerSolicitudes();
	//aqui iran mas funciones para traer los datos

}
function colocarPaginaAdministrador(){
	$.ajax({
		type: 'get',
		url: 'plantillas/admin/paginaadministrador.html',
		success: function(data){
			$('#contenidoPrincipalAdmin').html(data);
		},
		error: function(error){
			console.log('Error en peticion get: ',error);
		}
	});
}
function colocarPaginaSolicitante(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/paginasolicitante.html',
		success: function(data){
			$('#contenidoPrincipalAdmin').html(data);
		},
		error: function(error){
			console.log('Error en peticion get: ',error);
		}
	});
}
function colocarContadores(user){
	let _url = '';
	if(user=='administrador'){
		_url = 'plantillas/admin/contadoresadmin.html';
	}else if(user=='solicitante'){
		_url = 'plantillas/admin/contadoressolicitante.html';
	}
	$.ajax({
		type: 'get',
		url: _url,
		success: function(data){
			$('#contenidoPrincipal').html(data);
				if(user=='administrador'){
					establecerEventoParaContadoresAdmin();
				}else if(user=='solicitante'){
					establecerEventoParaContadoresSolicitante();
			}
		},
		error: function(error){
			console.log('Error en peticion GET: ',error);
		}
	});
}
function establecerEventoParaContadoresAdmin(){
	$('#tarClientes').click(colocarClientes);
	$('#tarSolicitudes').click(colocarSolicitudes);
	$('#tarAprobados').click(colocarAprobadosAdmin);
	$('#tarDocumentos').click(colocarDocumentos);
}

function establecerEventoParaContadoresSolicitante(){
	$('#tarSolicitados').click(colocarSolicitados);
	$('#tarAprobados').click(colocarAprobados);
	$('#tarDesembolsados').click(colocarDesembolsados);
	$('#tarVigentes').click(colocarVigentes);
}
//Funciones par manipular la pagina de solicitante
function colocarSolicitados(){
	$.ajax({
		type: 'get',
		url: 'plantillas/admin/solicitante/solicitados.html',
		success: function(data){
			$('#resultado').html(data);
			consultarContadoresSolicitante();
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
	});
	consultarContadoresSolicitante();
}
function colocarAprobados(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/solicitante/aprobados.html',
		success: function(data){
			$('#resultado').html(data);
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
	});
}
function colocarDesembolsados(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/solicitante/desembolsados.html',
		success: function(data){
			$('#resultado').html(data);
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
	});
}
function colocarVigentes(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/solicitante/vigentes.html',
		success: function(data){
			$('#resultado').html(data);
			consultarContadoresSolicitante();
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
		});
}
function traerSolicitados(){
	$.ajax({
		type: 'post',
		url: '/solicitados/',
		success: function(data){
			//console.log(data);
			$('.filas-solicitadas').remove();
			let myhtml = ``;
			for(let i=0; i<data.length;i++){
					myhtml += (`<tr class="filas-solicitadas">
		              <td>${data[i].nMonto}</td>
		              <td>${data[i].nPlazo}</td>
		              <td>interes</td>
		              <td>subTotal</td>
		              <td>iva</td>
		              <td>total</td>
		              <td>${data[i].cDestino}</td>
		              <td>${data[i].tCreacion}</td>
		              <td class="success">SI</td>
		              <td><button type="button" class="btn btn-primary btn-xs btn-block">Ver detalle</button></td>
		            </tr>`);
			}
			$('#filasSolicitados').after(myhtml);
			$('#contadorSolicitante').text(data.length);
		},
		error: function(error){
			console.log('Hubo un error en peticion POST: ',error);
		}
	});
}
function traerVigentes(){
	$.ajax({
		type: 'post',
		url: '/vigentes/',
		success: function(data){
			console.log(data);
			let myhtml = ``;
			for(let i=0; i<data.length;i++){
					myhtml += (`<tr>
		              <td>${data[i].nMonto}</td>
		              <td>${data[i].nPlazo}</td>
		              <td>interes</td>
		              <td>subTotal</td>
		              <td>iva</td>
		              <td>total</td>
		              <td>${data[i].cDestino}</td>
		              <td>${data[i].tCreacion}</td>
		              <td class="success">SI</td>
		              <td><button type="button" class="btn btn-primary btn-xs btn-block">Ver detalle</button></td>
		            </tr>`);
			}
			$('#filasVigentes').after(myhtml);
			$('#contadorVigente').text(data.length);
		},
		error: function(error){
			console.log('Hubo un error en peticion POST: ',error);
		}
	});
}
//funciones para manipular la pagina de administrador
function colocarClientes(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/administrador/clientes.html',
		success: function(data){
			$('#resultado').html(data);
			consultarContadoresAdministrador();
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
	});
	consultarContadoresAdministrador();
}
function colocarSolicitudes(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/administrador/solicitudes.html',
		success: function(data){
			$('#resultado').html(data);
			consultarContadoresAdministrador();
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
	});
	consultarContadoresAdministrador();
}

function colocarAprobadosAdmin(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/administrador/aprobados.html',
		success: function(data){
			$('#resultado').html(data);
			//consultarContadoresSolicitante();
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
	});
}
function colocarDocumentos(){
		$.ajax({
		type: 'get',
		url: 'plantillas/admin/administrador/documentos.html',
		success: function(data){
			$('#resultado').html(data);
			//consultarContadoresSolicitante();
		},
		error: function(error){
			console.log('Hubo un error en la peticion GET');
		}
	});
}

function traerClientes(){
	$.ajax({
		type: 'post',
		url: '/clientes/',
		success: function(data){
			//console.log(data);
			let myhtml = ``;
			for(let i=0; i<data.length;i++){
					myhtml += (`<tr class="dato-clientes" id="cliente${data[i].nCodigo}">
					<td class="hidden"><input type="text" value="${data[i].nCodigo}"></td>
		              <td>${data[i].cDNI}</td>
		              <td>${data[i].cNombres}</td>
		              <td>${data[i].cApellido_paterno}</td>
		              <td>${data[i].cApellido_materno}</td>
		              <td>${data[i].tCreacion}</td>
		              <td><button type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#mimodalmasinformacion">más info</button></td>
		            </tr>`);  
			}
			$('#filasClientes').after(myhtml);

			for(let i=0; i<data.length;i++){
				$(`#cliente${data[i].nCodigo}`).on('click',function(){
		            	consultarCliente($(`#cliente${data[i].nCodigo} input`).val());
		            	traerContadoresClienteEspecifico($(`#cliente${data[i].nCodigo} input`).val());
		         });
			}
			$('#contadorClientes').text(data.length);
		},
		error: function(error){
			console.log('Hubo un error en peticion POST: ',error);
		}
	});
	
}
function traerSolicitudes(){
		$.ajax({
		type: 'post',
		url: '/solicitados/',
		success: function(data){
			//console.log(data);
			$('.dato-solicitudes').remove();

			let myhtml = ``;
			for(let i=0; i<data.length;i++){
					myhtml += (`<tr class="dato-solicitudes">
						<td>${(i+1)}</td>
						<td>71761887</td>
		              <td>S/. ${data[i].nMonto}</td>
		              <td>${data[i].nPlazo}</td>
		              <td>${data[i].cDestino}</td>
		              <td>${data[i].cEstado}</td>
		              <td><button type="button" class="btn btn-success btn-xs btn-block">más info</button></td>
		            </tr>`);
			}

			$('#filasSolicitudes').after(myhtml);
			$('#contadorSolicitudes').text(data.length);
		},
		error: function(error){
			console.log('Hubo un error en peticion POST: ',error);
		}
	});

}

function traerContadoresClienteEspecifico(_codigoCliente){
	$.ajax({
		type: 'post',
		url: '/contadores_especifico/',
		data: {
			codigoCliente: _codigoCliente
		},
		success: function(data){
			console.log(data);
			$('#infoContSolicitados').text(data.solicitados.length);
			$('#infoContAprobados').text(data.aprobados);
			$('#infoContDesembolsados').text(data.desembolsados);
			$('#infoContVigentes').text(data.vigentes);

			//Establecermos evento para los contadores(DIVS)
			$('#consultarSolicitados').on('click',function(){
				mostrarSolicitados(data);
			});

			$('#consultarAprobados').on('click',function(){
				alert('Click');
			});

			$('#consultarDesembolsados').on('click',function(){
				alert('Click');
			});

			$('#consultarVigentes').on('click',function(){
				alert('Click');
			});


		},
		error: function(error){
			console.log('Error en la peticion POST: ',error);
		}
	});
}

//funcion para consultar solamente los datos de un cliene
function consultarCliente(_codigoCliente){
	$.ajax({
		type: 'post',
		url: '/encontrar_cliente/',
		data: {
			codigoCliente: _codigoCliente
		},
		success: function(data){
			//console.log(data);
			
			$('#infoDni').val(data[0][0].cDNI);
			$('#infoNombre').val(data[0][0].cNombres);
			$('#infoApellidoPaterno').val(data[0][0].cApellido_paterno);
			$('#infoApellidoMaterno').val(data[0][0].cApellido_materno);
			$('#infoEmail').val(data[0][0].cEmail);
			$('#infoTelefonoMovil').val(data[0][0].cTelefono);
			$('#infoDepartament').val(data[5].departamento);
			$('#infoProvincia').val(data[4].provincia);
			$('#infoDistrito').val(data[3].distrito);
			$('#infoDomicilio').val(data[0][0].cDomicilio);
			$('#infoFechaRegistro').text(data[0][0].tCreacion);
			$('#infoRuc').val(data[2][0].cRuc);
			$('#infoNombreEmpresa').val(data[2][0].cNombre);
			$('#infoSalario').val('S/. '+data[1][0].nSalario);
			//$('#infoSolicitudes').text('5');
			//$('#infoDesembolsos').text('5');
		},
		error: function(xhr,status,error){
			console.log('Error en peticion: ',error);
		}
	});
}
//Funcion que muestra las solicitudes del cliente en el mismo modal
function mostrarSolicitados(data){
	console.log(data);
	let filasHtml = ``;
	let myhtml = `
    <div class="panel panel-default">
    	<div class="panel-heading">
    	<span class="panel-title">Se solicitó ${data.solicitados.length} veces</span>
    	</div>
    	<div class="panel-body">
    		<div class="row">
    		<div class="col-md-12">
					<div class="checkbox">
					<label><input type="checkbox" value="">Mostrar solo vigentes</label>
					</div>
    		</div>
    			<div class="col-md-6 ">
    					<div class="table-responsive">
    			<table class="table-bordered table-hover table-condensed">
    				<tr id="ultimaFilaSolicitud">
    					<th>N°</td>
    					<th>Monto</th>
    					<th>Plazo</th>
    					<th>Destino</th>
    					<th>Estado</th>
    					<th>Opciones</th>
    				</tr>
    			</table>
    		</div>
    			</div>

    			<div class="col-md-6 " id="detalleSolicitud">

    			

    			</div>
    		</div>
    	
    	</div>
    </div>
	`;

	//$('#modalPrincipal').html(data.solicitados[0].cDestino);
	$('#modalPrincipal').html(myhtml);

	for(let i=0; i<data.solicitados.length; i++){

		filasHtml += (`
			<tr>
				<td>${(i+1)}</td>
				<td>${data.solicitados[i].nMonto}</td>
				<td>${data.solicitados[i].nPlazo}</td>
				<td>${data.solicitados[i].cDestino}</td>
				<td>${data.solicitados[i].cEstado}</td>
				<td><button class="btn btn-primary btn-xs" onClick="mostrarResumenSolicitado('hola')">Detalle</button></td>
			</tr>
			`);
	}
	$('#ultimaFilaSolicitud').after(filasHtml);
}

function mostrarResumenSolicitado(datos){
	console.log(datos);
}