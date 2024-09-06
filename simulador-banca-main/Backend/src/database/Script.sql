//77vRdnArGcY4teHo

CREATE TABLE boveda (
  id_boveda SERIAL PRIMARY KEY,
  id_movimiento INTEGER,
  saldo_boveda NUMERIC(10, 2) DEFAULT 0,
  entrada_saldo NUMERIC(10, 2) DEFAULT 0,
  salida_saldo NUMERIC(10, 2) DEFAULT 0,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cliente (
    id_cliente serial PRIMARY KEY,
    id_formpn INTEGER,
    id_tcliente INTEGER,
    id_rol INTEGER,
    username TEXT,
    password TEXT
);

CREATE TABLE detalle_cuenta(
    id_detalle serial PRIMARY KEY,
    id_cliente INTEGER,
    id_tcuenta INTEGER,
    id_empleado INTEGER,
    num_cuenta bigint GENERATED ALWAYS AS IDENTITY (START WITH 1000000001 INCREMENT BY 1) NOT NULL,
    CHECK (num_cuenta  >= 1000000000 AND num_cuenta  <= 9999999999),
    saldo NUMERIC(10, 2) DEFAULT 0,
    estado TEXT,
    razon_rechazo TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE empleado (
    id_empleado SERIAL PRIMARY KEY,
    id_rol INTEGER,
    saldo NUMERIC(10, 2) DEFAULT 0,
    saldo_solicitado NUMERIC(10, 2) DEFAULT 0,
    username varchar(30),
    username varchar(30),
    estado varchar(15)
);

CREATE TABLE movimientos (
    id_movimiento SERIAL PRIMARY KEY,
    id_empleado INTEGER NOT NULL,
    id_tipomov INTEGER NOT NULL,
    id_boveda INTEGER,
    id_detalle INTEGER,
    saldo NUMERIC(10, 2) NOT NULL,
    id_empleado_consing INTEGER NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rol (
    id_rol serial PRIMARY KEY,
    descripcion varchar(30)
);

CREATE TABLE tipo_cliente (
    id_tcliente serial PRIMARY KEY,
    descripcion varchar(30),
);

CREATE TABLE tipo_cuentas (
    id_tcuenta serial PRIMARY KEY,
    descripcion varchar(30),
);

CREATE TABLE tipo_movimiento (
    id_tipomov serial PRIMARY KEY,
    descripcion varchar(30)
);


CREATE TABLE FormPersonNatural (
    ID_FormPN serial PRIMARY KEY,
    --Información Personal--
    IP_primerNombre varchar(30),
    IP_segundoNombre varchar(30),
    IP_primerApellido varchar(30),
    IP_segundoApellido varchar(30),
    IP_tipoDoc varchar(20),
    IP_documento varchar(15),
    IP_fechaExpedicion date,
    IP_lugarExpedicion varchar(30),
    IP_fechaNacimiento date,
    IP_ciudadNac varchar(30),
    IP_genero varchar(5),
    IP_estadoCivil varchar(15),
    IP_nacionalidad varchar(30),
    --Información de Contacto Personal--
    ICP_direcResidencia varchar(30),
    ICP_bloque_torre varchar(30),
    ICP_apto_casa varchar(10),
    ICP_barrio varchar(20),
    ICP_ciudad_municipio varchar(20),
    ICP_departamento varchar(20),
    ICP_pais varchar(20),
    ICP_telefono varchar(20),
    ICP_celular varchar(20),
    ICP_email varchar(50),
    --Actividad Económica--
    AE_profesion varchar(30),
    AE_ocupacion varchar(30),
    AE_detalle_act varchar(50),
    AE_cod_ciiu varchar(20),
    AE_n_empleados varchar(20),
    --Información Laboral--
    IL_Nombre_Empresa varchar(25),
    IL_Direc_empresa varchar(20),
    IL_barrio varchar(20),
    IL_Ciudad_Municipio varchar(20),
    IL_Departamento varchar(20),
    IL_Pais varchar(20),
    IL_Telefono varchar(20),
    IL_EXT varchar(5),
    IL_celular varchar(20),
    IL_Email_laboral varchar(50),
    --Detalle Información Financiera--
    DIF_Ingresos_mensuales varchar(20),
    DIF_Otros_ingresos varchar(20),
    DIF_Detalle_Otros_ingresos varchar(50),
    DIF_Total_Activos varchar(20),
    DIF_Total_Pasivos varchar(20),
    DIF_Total_egresos_mensuales varchar(20),
    DIF_Ventas_anuales varchar(20),
    DIF_Fec_cierre_ventas date,
    --Información Tributaria--
    IT_Declara_renta varchar(12),
    IT_Age_retenedor varchar(12),
    IT_Regimen_iva varchar(12),
    IT_Tributo_EEUU varchar(12),
    IT_id_tributo_eeuu varchar(20),
    IT_Tributo_otro_pais varchar(20),
    IT_id_otro_pais varchar(20),
    IT_Origen_Bienes varchar(20),
    IT_Pais_origen varchar(20),
    IT_Ciudad_origen varchar(20),
    --Información Operaciónes Internacionales--
    IOIN_Moneda_extranjera varchar(12),
    IOIN_Tipos_ope varchar(20),
    IOIN_Nombre_entidad varchar(30),
    IOIN_Tipo_produc varchar(25),
    IOIN_N_produc varchar(20),
    IOIN_Monto_mensual_promedio varchar(20),
    IOIN_Moneda varchar(12),
    IOIN_Ciudad varchar(20),
    IOIN_Pais varchar(20)
    
);

-- Llaves foraneas
ALTER TABLE boveda
ADD FOREIGN KEY (id_movimiento) REFERENCES movimientos(id_movimiento);

ALTER TABLE cliente
ADD FOREIGN KEY (id_formpn) REFERENCES FormPersonNatural(id_formpn);
ADD FOREIGN KEY (id_tcliente) REFERENCES tipo_cliente(id_tcliente);
ADD FOREIGN KEY (id_rol) REFERENCES rol(id_rol);

ALTER TABLE detalle_cuenta
ADD FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente);
ADD FOREIGN KEY (id_tcuenta) REFERENCES tipo_cuentas(id_tcuenta);
ADD FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado);

ALTER TABLE empleado
ADD FOREIGN KEY (id_rol) REFERENCES rol(id_rol);

ALTER TABLE movimientos
ADD FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado);
ADD FOREIGN KEY (id_tipomov) REFERENCES tipo_movimiento(id_tipomov);
ADD FOREIGN KEY (id_boveda) REFERENCES boveda(id_boveda);
ADD FOREIGN KEY (id_empleado_consing) REFERENCES empleado(id_empleado),

-- Insertar datos en la tabla rol
INSERT INTO rol (descripcion) VALUES
('Director'),
('Asesor'),
('Cajero'),
('Cajero Principal'),
('Cliente');

-- Insertar datos en la tabla empleado
INSERT INTO empleado (id_rol, username, password, saldo, estado, saldo_solicitado) VALUES
(1, 'Juan', 'juan', 0, 'Activo', 0),
(2, 'Asesor', 'asesor', 0, 'Activo', 0),
(3, 'Luna', 'moon', 0, 'Activo', 0),
(4, 'Angelica', 'angelica', 0, 'Activo', 0);

-- Insertar datos en la tabla tipo_cliente
INSERT INTO tipo_cliente (descripcion) VALUES
('Natural'),
('Juridico');

-- Insertar datos en la tabla tipo_cuentas
INSERT INTO tipo_cuentas (descripcion) VALUES
('Cuenta de Ahorros'),
('Cuenta Corriente');

-- Insertar datos en la tabla tipo_movimientos
INSERT INTO tipo_movimiento (descripcion) VALUES
('Consignacion'),
('Retiro'),
('Entrada Boveda'),
('Salida Boveda');

select * from cliente;

SELECT c.id_cliente, fpn.IP_primerNombre AS nombre, dc.estado AS estado_cliente, tc.descripcion AS tipo_cuenta, dc.num_cuenta
FROM detalle_cuenta AS dc
JOIN cliente AS c ON dc.id_cliente = c.id_cliente
JOIN FormPersonNatural AS fpn ON c.id_formpn = fpn.id_formpn
JOIN tipo_cuentas AS tc ON dc.id_tcuenta = tc.id_tcuenta;

-- join  busqueda de cliente (Incompleto)
SELECT 
    FPN.IP_primerNombre as nombre,
    FPN.IP_segundoNombre,
    FPN.IP_primerApellido,
    FPN.IP_segundoApellido,
    FPN.AE_profesion,
    FPN.AE_ocupacion,
    FPN.DIF_Ingresos_mensuales,
    FPN.DIF_Otros_ingresos,
    FPN.IT_Declara_renta,
    dC.Saldo,
    Dc.Num_Cuenta
FROM FormPersonNatural AS FPN
JOIN cliente AS C ON FPN.ID_FormPN = C.id_formpn
JOIN detalle_cuenta AS DC ON C.ID_Cliente = Dc.id_Cliente;