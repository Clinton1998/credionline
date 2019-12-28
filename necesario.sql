--listo
--sis_m_usuarios
--sis_t_departamentos
--sis_t_privincias
--sis_t_distritos
--sis_m_clientes
--SIS_M_EMPRESAS
--sis_p_trabajadores
--sis_m_solicitudes

CREATE TABLE SIS_M_CLIENTES(
    nCodigo INT AUTO_INCREMENT,
    cDNI varchar(20) NOT NUll UNIQUE,
    cNombres VARCHAR(40) not null,
    cApellido_paterno VARCHAR(50) NOT NULL,
    cApellido_materno VARCHAR(50) NOT NULL,
    cEmail VARCHAR(60) NOT NULL,
    cTelefono VARCHAR(20) NOT NULL,
    nCodigo_distrito INT,
    cDomicilio VARCHAR(70) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP NULL,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nCodigo_distrito) REFERENCES SIS_T_DISTRITOS(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);

CREATE TABLE SIS_T_DEPARTAMENTOS(
    nCodigo INT AUTO_INCREMENT,
    cNombre VARCHAR(70) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);

CREATE TABLE SIS_T_PROVINCIAS(
    nCodigo INT AUTO_INCREMENT,
    nCodigo_departamento INT NOT NULL,
    cNombre VARCHAR(70) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nCodigo_departamento) REFERENCES SIS_T_DEPARTAMENTOS(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);

CREATE TABLE SIS_T_DISTRITOS(
    nCodigo INT AUTO_INCREMENT,
    nCodigo_provincia INT NOT NULL,
    cNombre VARCHAR(40) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP NULL,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nCodigo_provincia) REFERENCES SIS_T_PROVINCIAS(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);

CREATE TABLE SIS_M_USUARIOS(
    nCodigo INT AUTO_INCREMENT,
    nCodigo_cliente INT,
    cTipo VARCHAR(20) not null,
    cContrasena VARCHAR(255) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT,
    tModificacion TIMESTAMP,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);


CREATE TABLE SIS_M_EMPRESAS(
    nCodigo INT AUTO_INCREMENT,
    cRuc VARCHAR(20) NOT NULL,
    cNombre VARCHAR(255) NOT NULL,
    nCodigo_distrito INT NOT NULL,
    cTelefono VARCHAR(20) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP NOT NULL,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nCodigo_distrito) REFERENCES SIS_T_DISTRITOS(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);

CREATE TABLE SIS_P_TRABAJADORES(
    nCodigo INT AUTO_INCREMENT,
    nCodigo_cliente INT NOT NULL,
    nCodigo_empresa INT NOT NULL,
    nSalario DECIMAL(10,2) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo) ,
    FOREIGN KEY(nCodigo_cliente) REFERENCES SIS_M_CLIENTES(nCodigo),
    FOREIGN KEY(nCodigo_empresa) REFERENCES SIS_M_EMPRESAS(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);

CREATE TABLE SIS_M_SOLICITUDES(
    nCodigo INT AUTO_INCREMENT,
    nCodigo_cliente INT NOT NULL,
    nMonto INT NOT NULL,
    nPlazo INT NOT NULL,
    nTaza INT NOT NULL,
    cDestino VARCHAR(90) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nCodigo_cliente) REFERENCES SIS_M_CLIENTES(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);

CREATE TABLE SIS_M_DESEMBOLSOS(
    nCodigo INT AUTO_INCREMENT,
    nCodigo_solicitud INT NOT NULL,
    cBanco VARCHAR(70) NOT NULL,
    cTipo_cuenta VARCHAR(60) NOT NULL,
    cNumero_cuenta VARCHAR(90) NOT NULL,
    cEstado VARCHAR(1) NOT NULL DEFAULT 'A',
    tCreacion TIMESTAMP NOT NULL DEFAULT NOW(),
    nUsuario_crea INT NOT NULL,
    tModificacion TIMESTAMP,
    nUsuario_modifica INT,
    PRIMARY KEY(nCodigo),
    FOREIGN KEY(nCodigo_solicitud) REFERENCES SIS_M_SOLICITUDES(nCodigo),
    FOREIGN KEY(nUsuario_crea) REFERENCES SIS_M_USUARIOS(nCodigo),
    FOREIGN KEY(nUsuario_modifica) REFERENCES SIS_M_USUARIOS(nCodigo)
);


