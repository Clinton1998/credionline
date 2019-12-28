/*realmente seria esto var express = require('./node_modules/express')
	Pero ya no hace falta por que ya esta instald gracia a npm y basta con
	poner el nombre del modulo
*/

const express = require('express');
//se crea una copia express
const app = express();

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const datos = require('./config');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Para manejar archivos
const multer = require('multer');
const upload = multer({dest: '/files'});

app.post('/upload',upload.array('documentos',3),function(req,res){
	console.log(req.files);
	res.send(req.files);
});

//Config plantilla
app.engine('handlebars',handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//Configurando el Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configuracion midelware par la gestion de sessiones y cookies
app.use(session({
	secret: 'jkjkjkjkjk',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge:(5*60*60*1000)}
}));

//configurando conexion a la base de datos
const sequelize = new Sequelize(datos.bd,datos.usuario,datos.contrasena,datos.direccion);
sequelize.authenticate()
.then(()=>{
	console.log('Conectado correctamente');
})
.catch((error)=>{
	console.log('Error de conexion a la base de datos: '+error);
});
//Mis modelos
const Cliente = sequelize.define('SIS_M_CLIENTES',{
	 nCodigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

	cDNI: {
		type: Sequelize.STRING,
		unique: true	
	},
	cNombres: {
		type: Sequelize.STRING	
	},
	cApellido_paterno:{
		type: Sequelize.STRING	
	},
	cApellido_materno:{
		type: Sequelize.STRING	
	},
	cEmail:{
		type: Sequelize.STRING	
	},
	cTelefono:{
		type: Sequelize.STRING	
	},
	nCodigo_distrito:{
		type: Sequelize.INTEGER	
	},
	cDomicilio:{
		type: Sequelize.STRING	
	},
	cEstado:{
		type: Sequelize.STRING	
	},
	tCreacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER	
	},
	tModificacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER	
	}
});

const Trabajador = sequelize.define('SIS_P_TRABAJADORES',{
	 nCodigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
	nCodigo_cliente: {
		type: Sequelize.INTEGER		
	},
	nCodigo_empresa: {
		type: Sequelize.INTEGER	
	},
	nSalario:{
		type: Sequelize.DECIMAL	
	},
	cEstado:{
		type: Sequelize.STRING	
	},
	tCreacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER	
	},
	tModificacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER	
	}
});

const Solicitud = sequelize.define('SIS_M_SOLICITUDES',{
	 nCodigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
	nCodigo_cliente: {
		type: Sequelize.INTEGER		
	},
	nMonto: {
		type: Sequelize.INTEGER		
	},
	nPlazo: {
		type: Sequelize.INTEGER		
	},
	nTasa: {
		type: Sequelize.INTEGER
	},
	cDestino: {
		type: Sequelize.STRING
	},
	cEstado:{
		type: Sequelize.STRING	
	},
	tCreacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER	
	},
	tModificacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER	
	}
});

const Desembolso = sequelize.define('SIS_M_DESEMBOLSOS',{
	 nCodigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
	nCodigo_solicitud: {
		type: Sequelize.INTEGER		
	},
	cBanco: {
		type: Sequelize.STRING		
	},
	cTipo_cuenta: {
		type: Sequelize.STRING		
	},
	cNumero_cuenta: {
		type: Sequelize.STRING
	},
	cEstado:{
		type: Sequelize.STRING	
	},
	tCreacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER	
	},
	tModificacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER	
	}
});


const Usuario = sequelize.define('SIS_M_USUARIOS',{
	 nCodigo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
	nCodigo_cliente: {
		type: Sequelize.INTEGER		
	},
	cTipo: {
		type: Sequelize.STRING	
	},
	cContrasena:{
		type: Sequelize.STRING	
	},
	cEstado:{
		type: Sequelize.STRING	
	},
	tCreacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER
	},
	tModificacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER	
	}
});


const Empresa = sequelize.define('SIS_M_EMPRESAS',{
	nCodigo:{
		type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	},
	cRuc: {
		type: Sequelize.STRING
	},
	cNombre: {
		type: Sequelize.STRING
	},
	nCodigo_distrito: {
		type: Sequelize.INTEGER
	},
	cTelefono: {
		type: Sequelize.STRING
	},
	cEstado:{
		type: Sequelize.STRING	
	},
	tCreacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER	
	},
	tModificacion:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW	
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER	
	}

});

const Departamento = sequelize.define('SIS_T_DEPARTAMENTOS',{
	nCodigo: {
		type: Sequelize.INTEGER
	},
	cNombre: {
		type: Sequelize.STRING
	},
	cEstado: {
		type: Sequelize.STRING
	},
	tCreacion:  {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
		
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER
	},
	tModificacion: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER
	}
});
const Provincia = sequelize.define('SIS_T_PROVINCIAS',{
	nCodigo: {
		type: Sequelize.INTEGER
	},
	nCodigo_departamento: {
		type: Sequelize.INTEGER
	},
	cNombre: {
		type: Sequelize.STRING
	},
	cEstado: {
		type: Sequelize.STRING
	},
	tCreacion:  {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER
	},
	tModificacion: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER
	}
});

const Distrito = sequelize.define('SIS_T_DISTRITOS',{
	nCodigo: {
		type: Sequelize.INTEGER
	},
	nCodigo_provincia: {
		type: Sequelize.INTEGER
	},
	cNombre: {
		type: Sequelize.STRING
	},
	cEstado: {
		type: Sequelize.STRING
	},
	tCreacion:  {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	nUsuario_crea:{
		type: Sequelize.INTEGER
	},
	tModificacion: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	nUsuario_modifica:{
		type: Sequelize.INTEGER
	}
});

//Cliente.sync({force: true});

/*Ruta principal*/
app.get('/',function(req,res){
	res.render('cuerpo');
});

//Proceso de validación de datos ingresados
app.post('/scoring',function(req,res){
	let _codigoCliente = req.body.codigoCliente;
	let _aprobado = true;

	console.log('El codigo cliente recibido es: ',_codigoCliente);
	res.send({aprobado: _aprobado});
});



app.post('/departamentos',function(req,res){
	let _departamentos = 'prueba';
	Departamento.findAll({ attributes: ['nCodigo', 'cNombre'] })
  	.then(SIS_T_DEPARTAMENTOS => {
    	res.send(SIS_T_DEPARTAMENTOS);
  	})
  .catch(err => {
    console.log(err)
  });

});

app.post('/provincias',function(req,res){
	//recibiendo el codigo del select departamentp
	let nCodigo_depar = req.body.nCodigo_depar;
	//console.log('el valor enviado es: '+nCodigo_depar);

	Provincia.findAll({
		where: {nCodigo_departamento:nCodigo_depar},
		attributes: ['nCodigo', 'cNombre'] })
  	.then(SIS_T_PROVINCIAS => {
    	res.send(SIS_T_PROVINCIAS);
  	})
  .catch(err => {
    console.log(err)
  });
});
app.post('/distritos',function(req,res){
	let nCodigo_prov = req.body.nCodigo_prov;
	//console.log('el valor enviado es: '+nCodigo_prov);

	Distrito.findAll({
		where: {nCodigo_provincia:nCodigo_prov},
		attributes: ['nCodigo', 'cNombre'] })
  	.then(SIS_T_DISTRITOS => {
    	res.send(SIS_T_DISTRITOS);
  	})
  .catch(err => {
    console.log(err)
  });
});


app.post('/registrar_cliente',function(req,res){
	
	let formulario = req.body.opcion;

	//CUANDO SE PIDAN DATOS PERSONALES
	if(formulario=='primero'){
		//AQUI HAREMOS UN INSERT PARA REGISTRAR SUS PRIMEROS DATOS DEL CLIENTE
		let dni = req.body.dni;
		let nombres = req.body.nombres;
		let apellidoPaterno = req.body.apellidoPaterno;
		let apellidoMaterno = req.body.apellidoMaterno;
		let email = req.body.email;
		let telefonoMovil = req.body.telefonoMovil;
		
		//al cliente se le registrara por defecto como inactivo, esto hasta que complete
		//el proceso


		//Haremos una consulta de DNI par evitar registrar doble numero de DNI
		Cliente.findAll({
			where: {cDNI: dni}
		}).then((SIS_M_CLIENTES)=>{

		if(SIS_M_CLIENTES.length==0){//si no hay registro
		//quiere decir que no hay un cliente con el DNI
		Cliente.findAll({
				where:{cEmail: email}
			}).then((SIS_CLIENTES)=>{
				if(SIS_CLIENTES.length==0){
					//quiere decir que no hay cliente registrado con el email enviado ni con el DNI existente en la DB
				Cliente.create({
					cDNI: dni,
					cNombres: nombres,
					cApellido_paterno: apellidoPaterno,
					cApellido_materno: apellidoMaterno,
					cEmail: email,
					cTelefono: telefonoMovil,
					cEstado: 'inactivo',
					nUsuario_crea: 1,
					nUsuario_modifica: 1
				})
				.then(()=>{
				//res.send('Guardado correctamente');
					let _codigoCliente;
					Cliente.findAll({
					where: {cDNI:dni},
					attributes: ['nCodigo'] })
					.then(SIS_M_CLIENTEs => {
						res.send(SIS_M_CLIENTEs);
					})
					.catch(err => {
						console.log('Hubo un error: '+err)
					});
				})
				.catch((error)=>{
					console.log('Hubo un error en Modelo Cliente: ',error);
					res.send({codigo: 0});
				});
				
				}else{//si existe cliente con el email
					res.send({existe_email: true});
					console.log('Mal, Un cliente ya se registro con el email\nRecomendacion: Inicie sesion');
				}
			})

		
		}else{
		//Notificaremos al cliente de que ya se registraron con el DNI
		//Recomendaremos que inicie sesion
		res.send({existe_dni: true});
		console.log('Mal, Un cliente ya se registro con el DNI\nRecomendacion: Inicie sesion');

		}
		}).catch((error)=>{
			console.log('Error en Modelo Cliente: ',error);
		});

	}//CUANDO PIDAN SU DIRECCION
	else if(formulario=='segundo'){
		let codigoCliente = req.body.codigoCliente;
		let codigoDistrito = req.body.codigoDistrito;
		let domicilio = req.body.domicilio;
		//AQUI HAREMOS UN UPDATE AL CLIENTE QUE YA PUSO SUS DATOS
		//console.log('Aqui haremos la actualizacion');
		Cliente.update({
			nCodigo_distrito: codigoDistrito,
			cDomicilio: domicilio
		},{
			where: {nCodigo: codigoCliente}
		})
		.then(()=>{
			res.end();
			console.log('Cliente actualizado correctamente');
		})
		.catch((error)=>{
			res.end();
			console.log('Hubo un error: '+error);
		});
		res.send('ok');
	}
});

app.post('/eliminar_cliente',function(req,res){
	let _codigoCliente = req.body.codigoCliente;
	Cliente.destroy({
		where: {nCodigo: _codigoCliente}
	}).then(()=>{
		res.send('Cliente eliminado correctamente');
	}).catch((error)=>{
		res.end();
		console.log('Error en modelo Cliente: ',error);
	});	
});

app.post('/consultar_estado_empresa',function(req,res){
	let _codigoEmpresa = req.body.codigoEmpresa;
	Empresa.findAll({
		where: {nCodigo: _codigoEmpresa}
	}).then((SIS_M_EMPRESAS)=>{
		if(SIS_M_EMPRESAS[0].cEstado.toUpperCase()=='VIGENTE'){
			res.send({estado:{vigente: true}});
		}else{
			res.send({estado:{vigente: false}});
		}
	}).catch((error)=>{
		res.end();
		console.log('Error en modelo Empresa: ',error);
	});
});

app.post('/buscarempresa',function(req,res){
	let ruc = req.body.ruc;

	Empresa.findAll({
		where: {cRuc: ruc},
		attributes: ['nCodigo','cNombre']
	}).then(SIS_M_EMPRESAS=>{
		res.send(SIS_M_EMPRESAS);
	}).catch((error)=>{
		console.log('El error es: '+error);
	});
});

app.post('/registrar_trabajador',function(req,res){
	let codigoCliente = req.body.codigoCliente;
	let codigoEmpresa = req.body.codigoEmpresa;
	let salario = req.body.salario;

	Trabajador.create({
			nCodigo_cliente: codigoCliente,
			nCodigo_empresa: codigoEmpresa,
			nSalario: salario,
			cEstado: 'vigente',
			nUsuario_crea: 1,
			nUsuario_modifica: 1
		})
		.then(function(){
			console.log('trabajador registrado correctamente');
		})
		.catch(function(error){
			res.end();
			console.log('Ocurrio un error: '+error);
		});
		res.send('ok');
});


app.post('/registrar_usuario',function(req,res){
	let _codigoCliente = req.body.codigoCliente;
	let _contrasena = req.body.contrasena;
	let _repiteContrasena = req.body.repiteContrasena;
	if(_contrasena==_repiteContrasena){

		Usuario.create({
			nCodigo_cliente: _codigoCliente,
			cTipo: 'solicitante',
			cContrasena: _contrasena,
			cEstado: 'inactivo',
			nUsuario_crea: 1,
			nUsuario_modifica: 1
		})
		.then(()=>{
		console.log('Usuario registrado correctamente');
		})
		.catch((error)=>{
		console.log('Hubo un error: '+error);
		});

	}else{
		console.log('Las contraseñas enviadas no son correctas');
	}

	res.send('ok');
});

//Funcion que verifica la sessionn en paginas protegidas
function verificarSession(req,res,next){
	if(req.session.nCodigo && req.session.nCodigo!==''){
		next();
	}else{
		res.redirect('/');
	}
}
//esta funcion me sirve para comprobar la session
//a diferencia de lo anterior este es mas personalizado
//Me servira para mostrar formulariosde registro UN (si o No)
function verificarSessionEnFormularioBack(req,res,next){
	if(req.session.nCodigo && req.session.nCodigo!==''){
		next();
	}else{
		res.send({continua: true});
	}
}

/******************************/

app.post('/login',function(req,res,next){
	//aqui haremos uso de los credenciales
	//seguridad-->no permitiremos la inyeccion SQL
	//un 0 o 1
	let _email = req.body.email;
	let _contrasena = req.body.contrasena;

	//este proceso es para obtener el codigoCliente
	//El codigoCliente servira para verificar en la tabla SIS_M_USUARIOS
	//Gracias a que el campo cEmail es UNIQUE esto es posible
	//nO ES POSIBLE HACER JOIN ya que no tenemos el nCodigo_clinte en la tabla SIS_M_USUARIOS
	
	//Esta consulta nos devolvera el codigoCliente de cliente con el correo mandado
	//Para utilizarlo en la tabla siguiente
	Cliente.findAll({
		where: {cEmail: _email},
		attributes: ['nCodigo']
	})
	.then((SIS_M_CLIENTES)=>{
		//console.log(SIS_M_CLIENTES);

		_codigoCliente = SIS_M_CLIENTES[0].nCodigo;
		console.log('El cogigo del cliente es:  '+_codigoCliente);

		//aqui haremos la consulta de que si el email y su contraseña es correcta
		
		Usuario.findAll({
			where: {nCodigo_cliente:_codigoCliente,cContrasena: _contrasena},
			attributes: ['nCodigo','cTipo','nCodigo_cliente']})
		.then(SIS_M_USUARIOS => {
			if(SIS_M_USUARIOS.length==0){
				console.log('No hay usuario');
				res.send({correcto:false});
			}else{
				//Guardamos el nCodigo del usario(PODRIAMOS GUARDAR TAMBIEN EMAIL)
				req.session.nCodigo = SIS_M_USUARIOS[0].nCodigo;
				req.session.cTipo = SIS_M_USUARIOS[0].cTipo;
				req.session.nCodigo_cliente = SIS_M_USUARIOS[0].nCodigo_cliente;

				res.send({correcto:true});
				//res.redirect('/admin');
				//esto le enviamos al frontend cuando email y contraseña es correcta
				//res.send({correcto:true,cTipo: SIS_M_USUARIOS[0].cTipo});
			}
		})
		.catch((err) => {
			res.send({correcto: false});
		});

		//res.send('ok');
	})
	.catch((error)=>{
		res.send({correcto: false});
	});

});

app.post('/tipo_usuario_logueado',verificarSession,function(req,res){
	//Haremos una consulta para saber el tipo de usuario logueado

	Usuario.findAll({
		where: {nCodigo: req.session.nCodigo},
		attributes: ['cTipo']
	}).then((SIS_M_USUARIOS)=>{
		res.send(SIS_M_USUARIOS[0].cTipo.toUpperCase());
	}).catch((error)=>{
		res.end();
		console.log('Hubo un error en Modelo Usuario: ',error);
	});
})

app.post('/registrar_monto_plazo',function(req,res){
	let _codigoCliente = req.body.codigoCliente; 
	let _monto = req.body.monto;
	let _plazo = req.body.plazo;
	let _tasa = 9;//9% por defecto
	let _destino = req.body.destino;

	//registro
	Solicitud.create({
		nCodigo_cliente: _codigoCliente,
		nMonto: _monto,
		nPlazo: _plazo,
		nTasa: _tasa,
		cDestino: _destino,
		cEstado: 'vigente',
		nUsuario_crea: 1,
		nUsuario_modifica: 1
	})
	.then(()=>{
		console.log('Registrado correctamente');
		Solicitud.findAll({
			//estas dos lineas sirven cuando el cliente se regisstra por primer vez
			//No sirve si quiere una segunda solicitud,
			//Podria hacerse un order by de la fecha de la ultima solicitud
			//CLINTON ESTA PARTE ES TEMPORAL TIENES QUE SOLUCIONARLOS MAS ADELANTE
			where: {nCodigo_cliente: _codigoCliente},
			attributes: ['nCodigo']
			/*****TEMPORAL****/
		})
		.then((SIS_M_SOLICITUDES)=>{
			res.send(SIS_M_SOLICITUDES);
		})
		.catch((error)=>{
			console.log('Error en la consulta: '+error);
		});
	})
	.catch((error)=>{
		console.log('Hubo un error: '+error);
	});
	//res.send('ok');
	//res.send('La respuesta');
});

app.post('/registrar_datos_desembolso',function(req,res){
	let _codigoSolicitud = req.body.codigoSolicitud;
	let _banco = req.body.banco;
	let _tipoCuenta = req.body.tipoCuenta;
	let _numeroCuenta = req.body.numeroCuenta;

	Desembolso.create({
		nCodigo_solicitud: _codigoSolicitud,
		cBanco: _banco,
		cTipo_cuenta: _tipoCuenta,
		cNumero_cuenta: _numeroCuenta,
		cEstado: 'inactivo',
		nUsuario_crea: 1,
		nUsuario_modifica: 1
	})
	.then(()=>{
		console.log('Datos para el desembolso. Guardados correctamente');
	})
	.catch((error)=>{
		console.log('Datos de desembolso, hay error: '+error);
	});
	res.send('ok');

});

//esto es para cargar el dashboard
//ESTA PARTE TIENE QUE VERIFICAR LA SESSION y funcion next() para pasar
//a otro midleware

app.get('/admin',verificarSession,function(req,res){
	res.sendFile(__dirname+'/html/admin.html');
});
app.post('/consultar_solicitud_pendiente',verificarSession,function(req,res){
	//aqui consultaremos si el usuario logeado tiene una solicitud pendiente
	//recordemos que un cliente, solo puede tener 1 solicitud pendiente
	let _nCodigo_cliente = req.session.nCodigo_cliente;
	Solicitud.findAll({
		where: {cEstado: 'vigente', nCodigo_cliente: _nCodigo_cliente}
	}).then((SIS_M_SOLICITUDES)=>{
		if(SIS_M_SOLICITUDES.length>0){
			res.send({pendiente:true});
		}else{
			res.send({pendiente: false});
		}
	}).catch((error)=>{
		res.end();
		console.log('Error en modelo Solicitud: ',error);
	});
});	

app.post('/estalogueado',verificarSessionEnFormularioBack,function(req,res,next){
	let _masdatos = false;
	_masdatos = req.body.masdatos;

	if(_masdatos){
		console.log('Entro al if del bloque principal');
		//aqui devolveremos el nombre, su correo y mas datos
		//Guardamos el nCodigo de session (Guardamos el valor del campo nCodigo de la tabla USUARIOS)
		let _nCodigoSession = req.session.nCodigo;
		Usuario.findAll({
			where: {nCodigo: _nCodigoSession},
			attributes: ['nCodigo_cliente']
		}).then((SIS_M_USUARIOS)=>{
			Cliente.findAll({
				where: {nCodigo: SIS_M_USUARIOS[0].nCodigo_cliente},
				attributes: ['cNombres','cApellido_paterno','cApellido_materno']
			}).then((SIS_M_CLIENTES)=>{
				res.send(SIS_M_CLIENTES);
			}).catch((error)=>{
				res.end();
				console.log('Modelo Cliente, error: '+error);
			});
		}).catch((error)=>{
			res.end();
			console.log('Modelo Usuario, error: '+error);
		});
	}else{
		//Simplemente notificaremos con un objeto que ya esta logueado
		console.log('Entro el else');
		res.send({estalogueado: true});
	}
});

app.post('/existesession',verificarSession,function(req,res,next){
	if(req.session.nCodigo && req.session.nCodigo!==''){
		res.send({existe: true,nCodigo: req.session.nCodigo});
	}else{
		res.send({existe: false});
	}
});

function cerrarSession(req,res,next){
	if(req.session.nCodigo && req.session!==''){
		req.session.nCodigo = null;
		next();
	}
}
//ruta que elimina la sesion del usuario y redirige a la pagina principal
app.get('/salir',cerrarSession,function(req,res,next){
	res.redirect('/');
});

//Esta parte es un codigo spaguetti mas vale saber Squelize
//Temporal
app.post('/consultar_datos_modificacion',verificarSession,function(req,res,next){
	let _nCodigo = req.session.nCodigo;
	Usuario.findAll({
		where: {nCodigo:_nCodigo},
		attributes: ['nCodigo_cliente']
	}).then((SIS_M_USUARIOS)=>{
		//ahora si consultamos los datos personales del usuario
		Cliente.findAll({
			where: {nCodigo: SIS_M_USUARIOS[0].nCodigo_cliente},
			attributes: ['nCodigo','cNombres','cTelefono','nCodigo_distrito','cDomicilio']
		}).then((SIS_M_CLIENTES)=>{

			//Consulta a la tabla de Trabajadores para obtener el nCodigo_empresa y nSalario
			//aqui falta consultar la ubicacion del cliente
			Trabajador.findAll({
				where: {nCodigo_cliente: SIS_M_CLIENTES[0].nCodigo, cEstado: 'vigente'}
			}).then((SIS_M_TRABAJADORES)=>{
					Empresa.findAll({
						where: {nCodigo: SIS_M_TRABAJADORES[0].nCodigo_empresa}
					}).then((SIS_M_EMPRESAS)=>{
			//consulta anidada
			//aqui haremos una consulta avanzado para obtener la ubicacion
			//apartir de nCodigo_distrito
			//La consulta a la ubicion es temporal hast que aprendamos SQL y Sequelize
			//avanzado
			/***********************************************************/
			Distrito.findAll({
				where:{nCodigo: SIS_M_CLIENTES[0].nCodigo_distrito},
				attributes: ['nCodigo','nCodigo_provincia','cNombre']
			}).then((SIS_T_DISTRITOS)=>{
				Provincia.findAll({
					where: {nCodigo: SIS_T_DISTRITOS[0].nCodigo_provincia},
					attributes: ['nCodigo_departamento','cNombre']
				}).then((SIS_T_PROVINCIAS)=>{
					Departamento.findAll({
						where: {nCodigo: SIS_T_PROVINCIAS[0].nCodigo_departamento},
						attributes: ['cNombre']
					}).then((SIS_T_DEPARTAMENTOS)=>{
							
						let datos = [
						SIS_M_CLIENTES,SIS_M_TRABAJADORES,SIS_M_EMPRESAS
						,{
							distrito: SIS_T_DISTRITOS[0].cNombre,nCodigo_distrito: SIS_T_DISTRITOS[0].nCodigo
						},{
							provincia: SIS_T_PROVINCIAS[0].cNombre
						},{
							departamento: SIS_T_DEPARTAMENTOS[0].cNombre
						}];
						res.send(datos);
					}).catch((error)=>{
						res.end();
						console.log('Error en Modelo Departamento: ',error);
					});

				}).catch((error)=>{
					res.end();
					console.log('Error en Modelo Provincia: ',error);
				});

			}).catch((error)=>{
				res.end();
				console.log('Error en Modelo Distrito: ',error);
			});

			/******************************************************************/


					}).catch((error)=>{
						res.end();
						console.log('Hubo un error: ',error);
					});

			}).catch((error)=>{
				res.end();
				console.log('Error en Modelo Trabajador: ',error);
			});
			//res.send(SIS_M_CLIENTES);
		}).catch((error)=>{
			res.end();
			console.log('Error en Modelo Cliente: ',error);
		});

	}).catch((error)=>{
		res.end();
		console.log('Modelo Usuario, error: ',error);
	});
});

app.post('/actualizar_datos_form_modificacion',function(req,res){
	//Datos para la tabla SIS_M_CLIENTES

	let _codigoCliente = req.body.codigoCliente;
	let _telefono = req.body.telefono;
	let _codigoDistrito = req.body.codigoDistrito;
	let _domicilio = req.body.domicilio;

	//Datos para la tabla SIS_P_TRABAJADORES
	//Sera un INSERT INTO ya que  el trabajador estara en una una nueva empresa
	//El dato antiguo del trabajador no se borrará ni se actualizara
	//Necesitaremos el codigoCliente

	let _codigoTrabajador = req.body.codigoTrabajador;
	let _codigoEmpresaAntiguo = req.body.codigoEmpresaAntiguo;
	let _codigoEmpresaNuevo = req.body.codigoEmpresaNuevo;
	let _salario = req.body.salario;
	
	Cliente.update({
			cTelefono: _telefono,
			nCodigo_distrito: _codigoDistrito,
			cDomicilio: _domicilio
		},{
			where: {nCodigo: _codigoCliente}
		}).then(()=>{
			console.log('Modelo Cliente: Datos actualizados correctamente');
			//res.end();
		}).catch((error)=>{
			
			console.log('Error en UPDATE en Modelo Cliente: ',error);
			//res.end();
	});
		//aqui verificaremos si el cliente que h modificado sus datos
		//se ha ido a otra empresa, si es asi creamos un nuevo registro
		//De lo contrario actualizamos
		if(_codigoEmpresaNuevo==_codigoEmpresaAntiguo){
			//quiere decir que no modifico la empresa y solo haremos un UPDATE
			//solo se actualizara el salario si es necesario
			//Utilizaremos nCodigo del trabajador en el where del UPDATE
			Trabajador.update({
				nSalario: _salario,
				cEstado: 'vigente'
				},{
				where: {nCodigo: _codigoTrabajador}
			}).then(()=>{
				res.send({correcto:true});
				console.log('Salario y más actualizado correctamente');
			}).catch((error)=>{
				res.send('!');
				console.log('Error en Modelo Trabajador(update): ',error);
			});

		}else{
			//crearemos un nuevo registro CON INSERT INTO pero sin olvidar con codigo
			//Cliente , y su nuevo salario se registrara en el nuevo registro
			Trabajador.create({
				nCodigo_cliente: _codigoCliente,
				nCodigo_empresa: _codigoEmpresaNuevo,
				nSalario: _salario,
				cEstado: 'vigente',
				nUsuario_crea: 1,
				nUsuario_modifica: 1
			}).then(()=>{
				//cambiamos el estado del trabajador en la ultima empresa
				Trabajador.update({
					cEstado: 'inactivo'
				},{where: {nCodigo: _codigoTrabajador}}).then(()=>{
					res.send({correcto:true});
					console.log('Correcto. Estado atualizado');
				}).catch((error)=>{
					res.end('Erro en la actualizacion del estado: ',error);
				});

				res.send({correcto:true});
				console.log('Trabajador existente , registrado en otra empresa');
			}).catch((error)=>{
				res.send('!');
				console.log('Error en Modelo Trabajador(INSERT INTO): ',error);
			});

		}
	

});
//Funciones y metodos para el dashboard
app.post('/solicitados',verificarSession,function(req,res){
	let _cTipo = req.session.cTipo.toUpperCase();
	let _nCodigo = req.session.nCodigo;
	let _nCodigo_cliente = req.session.nCodigo_cliente;
	if(_cTipo=='ADMINISTRADOR'){
		//consultamos todos los datos de la tabla SOLICITUDES
		Solicitud.all({
			order: [['tCreacion','DESC']],
			where: {cEstado: 'vigente'}
		}).then((SIS_M_SOLICITUDES)=>{
			res.send(SIS_M_SOLICITUDES);
		}).catch((error)=>{
			res.end();
			console.log('Error en model Solicitud: ',error);
		});
	
	}else if(_cTipo=='SOLICITANTE'){
		//consultamos solo los datos del solicitante
		Solicitud.findAll({
			where: {nCodigo_cliente: _nCodigo_cliente},
			order: [['tCreacion','DESC']]
		}).then((SIS_M_SOLICITUDES)=>{
			res.send(SIS_M_SOLICITUDES);
		}).catch((error)=>{
			res.end();
			console.log('Error en modelo Solicitud: ',error);
		})

	}


});

app.post('/vigentes',verificarSession,function(req,res){
	let _cTipo = req.session.cTipo.toUpperCase();
	let _nCodigo = req.session.nCodigo;
	let _nCodigo_cliente = req.session.nCodigo_cliente;

	if(_cTipo=='ADMINISTRADOR'){
		//consultamos los vigentes solo para el usuario administrador

	}else if(_cTipo=='SOLICITANTE'){
		//consultamos los vigentes para el solicitante
		Solicitud.findAll({
			where: {nCodigo_cliente: _nCodigo_cliente,cEstado: 'vigente'}
		}).then((SIS_M_SOLICITUDES)=>{
			res.send(SIS_M_SOLICITUDES);
		}).catch((error)=>{
			res.end();
			console.log('Hubo un error en modelo Solicitud: ',error);
		});
	}else{
		res.end();
	}
})


//rutas para solicitar datos cuando el administrador esta logueado
app.post('/clientes',verificarSession,function(req,res){
	Cliente.all({
		order: [['tCreacion','DESC']]
	}).then((SIS_M_CLIENTES)=>{
		res.send(SIS_M_CLIENTES);
	}).catch((error)=>{
		res.end();
		console.log('Error en modelo Cliente: ',error);
	});

});

//Ruta para devolver una solicitud de un cliente especifico
app.post('/contadores_especifico',verificarSession,function(req,res){
	let _codigoCliente = req.body.codigoCliente;
	Solicitud.findAll({
		where: {nCodigo_cliente: _codigoCliente}
	}).then((SIS_M_SOLICITUDES)=>{
		//aqui haremos consulta de contadores
		//para aprobados,desembolsos,vigentes
		let contadores = {
			solicitados: SIS_M_SOLICITUDES,
			aprobados: 1,
			desembolsados: 1,
			vigentes: 1
		}
		res.send(contadores);
	}).catch((error)=>{
		res.end();
		console.log('Error en modelo Solicitud: ',error);
	});
});

//Ruta para una consulta con criterio
app.post('/encontrar_cliente',verificarSession,function(req,res){
	let _codigoCliente = req.body.codigoCliente;
	Cliente.findAll({
		where: {nCodigo: _codigoCliente}
	}).then((SIS_M_CLIENTES)=>{
		/*************************************************/
			//Consulta a la tabla de Trabajadores para obtener el nCodigo_empresa y nSalario
			//aqui falta consultar la ubicacion del cliente
			Trabajador.findAll({
				where: {nCodigo_cliente: SIS_M_CLIENTES[0].nCodigo, cEstado: 'vigente'}
			}).then((SIS_M_TRABAJADORES)=>{
			Empresa.findAll({
				where: {nCodigo: SIS_M_TRABAJADORES[0].nCodigo_empresa}
			}).then((SIS_M_EMPRESAS)=>{
			//consulta anidada
			//aqui haremos una consulta avanzado para obtener la ubicacion
			//apartir de nCodigo_distrito
			//La consulta a la ubicion es temporal hast que aprendamos SQL y Sequelize
			//avanzado
			/***********************************************************/
			Distrito.findAll({
				where:{nCodigo: SIS_M_CLIENTES[0].nCodigo_distrito},
				attributes: ['nCodigo','nCodigo_provincia','cNombre']
			}).then((SIS_T_DISTRITOS)=>{
				Provincia.findAll({
					where: {nCodigo: SIS_T_DISTRITOS[0].nCodigo_provincia},
					attributes: ['nCodigo_departamento','cNombre']
				}).then((SIS_T_PROVINCIAS)=>{
					Departamento.findAll({
						where: {nCodigo: SIS_T_PROVINCIAS[0].nCodigo_departamento},
						attributes: ['cNombre']
					}).then((SIS_T_DEPARTAMENTOS)=>{
							
						let datos = [
						SIS_M_CLIENTES,SIS_M_TRABAJADORES,SIS_M_EMPRESAS
						,{
							distrito: SIS_T_DISTRITOS[0].cNombre,nCodigo_distrito: SIS_T_DISTRITOS[0].nCodigo
						},{
							provincia: SIS_T_PROVINCIAS[0].cNombre
						},{
							departamento: SIS_T_DEPARTAMENTOS[0].cNombre
						}];
						res.send(datos);
					}).catch((error)=>{
						res.end();
						console.log('Error en Modelo Departamento: ',error);
					});

				}).catch((error)=>{
					res.end();
					console.log('Error en Modelo Provincia: ',error);
				});

			}).catch((error)=>{
				res.end();
				console.log('Error en Modelo Distrito: ',error);
			});
			}).catch((error)=>{
					res.end();
					console.log('Hubo un error: ',error);
			});

			}).catch((error)=>{
				res.end();
				console.log('Error en Modelo Trabajador: ',error);
			});
			//res.send(SIS_M_CLIENTES);
		/*******************************************/
	}).catch((error)=>{
		res.end();
		console.log('Hub un error en modelo Cliente: ',error);
	});

});

app.use(express.static(__dirname + '/html'));
app.listen(8081,function(){
	console.log('El servidor nodejs esta corriendo en http://localhost:8081');
});//esta linea de codigo siempre tiene que ser ultimo
