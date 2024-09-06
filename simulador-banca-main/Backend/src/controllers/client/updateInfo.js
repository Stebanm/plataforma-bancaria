const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const updateInfo = async (req, res) => {
  const { id_cliente } = req.params;
  const {
    nombre,
    primer_apellido,
    segundo_apellido,
    tipo_documento,
    num_documento,
    lugar_expedicion,
    fecha_expedicion, // Asegúrate de que este sea un valor de fecha
    fecha_nacimiento, // Asegúrate de que este sea un valor de fecha
    ciudad_nacimiento,
    genero,
    estado_civil,
    nacionalidad,
    direccion_residencia,
    barrio,
    ciudad,
    departamento,
    pais,
    telefono,
    celular,
    correo_electronico,
    profesion,
    ocupacion,
    actividad,
    ingresos_mensuales,
    otros_ingresos,
    renta,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE formpersonnatural SET IP_primerNombre = $1, IP_primerApellido = $2, IP_segundoApellido = $3, 
      IP_tipoDoc = $4, IP_documento = $5, IP_lugarexpedicion = $6, IP_fechaExpedicion = $7, IP_fechaNacimiento = $8,
      IP_ciudadNac = $9, IP_genero = $10, IP_estadoCivil = $11, IP_nacionalidad = $12, ICP_direcResidencia = $13, 
      ICP_barrio = $14, ICP_ciudad_municipio = $15, ICP_departamento = $16, ICP_pais = $17, ICP_telefono = $18, ICP_celular = $19, 
      ICP_email = $20, AE_profesion = $21, AE_ocupacion = $22, AE_detalle_act = $23, DIF_Ingresos_mensuales = $24, 
      DIF_Otros_ingresos = $25, IT_Declara_renta = $26
      FROM cliente AS c 
      WHERE formpersonnatural.id_formpn = c.id_formpn AND c.id_cliente = $27`,
      [
        nombre,
        primer_apellido,
        segundo_apellido,
        tipo_documento,
        num_documento,
        lugar_expedicion,
        fecha_expedicion, // Debería ser un valor de fecha, formato 'YYYY-MM-DD'
        fecha_nacimiento, // Debería ser un valor de fecha, formato 'YYYY-MM-DD'
        ciudad_nacimiento,
        genero,
        estado_civil,
        nacionalidad,
        direccion_residencia,
        barrio,
        ciudad,
        departamento,
        pais,
        telefono,
        celular,
        correo_electronico,
        profesion,
        ocupacion,
        actividad,
        ingresos_mensuales,
        otros_ingresos,
        renta,
        id_cliente,
      ]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Actualización exitosa" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error("Error actualizando datos del cliente", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  updateInfo,
};
