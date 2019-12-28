const datosConexion = {
	bd: 'credionline',
	usuario: 'postgres',
	contrasena: 'essam2018',
	direccion: {
		host: 'localhost',
		dialect: 'postgres',
		define:{
			timestamps: false
		}
	}
}

module.exports = datosConexion;