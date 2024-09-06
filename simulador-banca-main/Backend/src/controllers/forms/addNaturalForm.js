const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const addNaturalForm = async (req, res) => {
  const formData = req.body;

  if (!formData.FechaCV) {
    formData.FechaCV = null;
  }

  const id = req.params.id;

  try {
    // Formulario-----------------------------------------------------------------------------------------------------------------

    // Asegúrate de que los nombres de las propiedades en formData coincidan con los nombres de las columnas en la tabla
    const {
      Nombre,
      Apellido1,
      Apellido2,
      opciones1,
      NDocumento,
      FechaE,
      LugarE,
      FechaN,
      CiudadN,
      opciones2,
      opciones3,
      Nacionalidad,
      DireccionR,
      BloqueTorre,
      AptoCasa,
      Barrio,
      Municipio,
      Departamento,
      Pais,
      Telefono,
      Celular,
      CorreoE,
      Profesion,
      opciones4,
      ActiEcoP,
      CodigoCIUU,
      NumeroEm,
      NombreEm,
      DireccionEm,
      BarrioEm,
      MunicipioEm,
      DepartamentoEm,
      PaisEm,
      TelefonoEm,
      Ext,
      CelularEm,
      CorreoEm,
      IngresosM,
      OIngresosM,
      TotalAc,
      Totalpa,
      DetalleOIM,
      TotalIn,
      VentasA,
      FechaCV,
      opciones5,
      opciones6,
      opciones7,
      opciones8,
      NumeroT,
      PaisT,
      Idtributario,
      FondosP,
      PaisFondos,
      CiudadFondos,
      opciones9,
      opciones10,
      NombreEn,
      opciones11,
      NProducto,
      MontoMP,
      Moneda,
      CiudadO,
      PaisOP,
    } = formData;
    // Construye la consulta de inserción
    const insertQuery = `INSERT INTO FormPersonNatural (IP_primerNombre, IP_primerApellido, IP_segundoApellido, IP_tipoDoc, IP_documento, IP_fechaExpedicion, IP_lugarExpedicion, IP_fechaNacimiento, IP_ciudadNac, IP_genero, IP_estadoCivil, IP_nacionalidad, ICP_direcResidencia, ICP_bloque_torre, ICP_apto_casa, ICP_barrio, ICP_ciudad_municipio, ICP_departamento, ICP_pais, ICP_telefono, ICP_celular, ICP_email, AE_profesion, AE_ocupacion, AE_detalle_act, AE_cod_ciiu, AE_n_empleados, IL_Nombre_Empresa, IL_Direc_empresa, IL_barrio, IL_Ciudad_Municipio, IL_Departamento, IL_Pais, IL_Telefono, IL_EXT, IL_celular, IL_Email_laboral, DIF_Ingresos_mensuales, DIF_Otros_ingresos, DIF_Detalle_Otros_ingresos, DIF_Total_Activos, DIF_Total_Pasivos, DIF_Total_egresos_mensuales, DIF_Ventas_anuales, DIF_Fec_cierre_ventas, IT_Declara_renta, IT_Age_retenedor, IT_Regimen_iva, IT_Tributo_EEUU, IT_id_tributo_eeuu, IT_Tributo_otro_pais, IT_id_otro_pais, IT_Origen_Bienes, IT_Pais_origen, IT_Ciudad_origen, IOIN_Moneda_extranjera, IOIN_Tipos_ope, IOIN_Nombre_entidad, IOIN_Tipo_produc, IOIN_N_produc, IOIN_Monto_mensual_promedio, IOIN_Moneda, IOIN_Ciudad, IOIN_Pais )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64) RETURNING id_formpn;`;
    // Asegúrate de proporcionar los valores en el orden correcto
    const insertValues = [
      Nombre,
      Apellido1,
      Apellido2,
      opciones1,
      NDocumento,
      FechaE,
      LugarE,
      FechaN,
      CiudadN,
      opciones2,
      opciones3,
      Nacionalidad,
      DireccionR,
      BloqueTorre,
      AptoCasa,
      Barrio,
      Municipio,
      Departamento,
      Pais,
      Telefono,
      Celular,
      CorreoE,
      Profesion,
      opciones4,
      ActiEcoP,
      CodigoCIUU,
      NumeroEm,
      NombreEm,
      DireccionEm,
      BarrioEm,
      MunicipioEm,
      DepartamentoEm,
      PaisEm,
      TelefonoEm,
      Ext,
      CelularEm,
      CorreoEm,
      IngresosM,
      OIngresosM,
      TotalAc,
      Totalpa,
      DetalleOIM,
      TotalIn,
      VentasA,
      FechaCV,
      opciones5,
      opciones6,
      opciones7,
      opciones8,
      NumeroT,
      PaisT,
      Idtributario,
      FondosP,
      PaisFondos,
      CiudadFondos,
      opciones9,
      opciones10,
      NombreEn,
      opciones11,
      NProducto,
      MontoMP,
      Moneda,
      CiudadO,
      PaisOP,
    ];
    const resultFormPersonNatural = await pool.query(insertQuery, insertValues);
    const formPersonNaturalId = resultFormPersonNatural.rows[0].id_formpn;
    // Segunda inserción en la tabla cliente utilizando el ID obtenido

    // Tabla cliente-------------------------------------------------------------------------------------------------------------

    const insertQueryCliente = `    
      INSERT INTO cliente (id_formpn, id_tcliente, id_rol, username, password)
      VALUES ($1, $2, $3, $4, $5) RETURNING id_cliente
      `;
    // Asegúrate de proporcionar los valores en el orden correcto
    const insertValuesCliente = [
      formPersonNaturalId,
      1,
      5,
      NDocumento,
      NDocumento,
    ];
    // Realiza la inserción en la tabla cliente
    const resultCliente = await pool.query(
      insertQueryCliente,
      insertValuesCliente
    );

    const clienteId = resultCliente.rows[0].id_cliente;

    // Detalle---------------------------------------------------------------------------------------------------------------------

    // const currentDate = new Date();
    // const dia = currentDate.getDate();
    // // Ten en cuenta que los meses en JavaScript son indexados desde 0 (enero es 0, febrero es 1, etc.)
    // const mes = currentDate.getMonth() + 1;
    // const anio = currentDate.getFullYear();

    // const fechaFormateada = `${anio}-${mes < 10 ? "0" + mes : mes}-${
    //   dia < 10 ? "0" + dia : dia
    // }`;

    const insertQueryDetalle = `INSERT INTO detalle_cuenta (id_cliente, id_tcuenta, id_empleado, saldo, estado) VALUES ($1, $2, $3, $4, $5)`;
    const insertValuesDetalle = [clienteId, 1, id, 0, "Pendiente"];
    const resultDetalle = await pool.query(
      insertQueryDetalle,
      insertValuesDetalle
    );

    res.status(201).json({
      message: "Datos insertados exitosamente",
      data: {
        formPersonNatural: resultFormPersonNatural.rows[0],
        cliente: resultCliente.rows[0],
        detalle: resultDetalle.rows[0],
      },
    });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  addNaturalForm,
};
