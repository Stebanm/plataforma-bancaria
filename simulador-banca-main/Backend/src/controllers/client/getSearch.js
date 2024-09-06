const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getSearch = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      c.id_cliente,
      fpn.IP_primerNombre AS Nombre,
      fpn.IP_primerApellido AS PrimerApellido,
      fpn.IP_segundoApellido AS SegundoApellido,
      fpn.IP_fechaNacimiento AS FechaNacimiento,
      fpn.IP_ciudadNac AS CiudadNacimiento,
      fpn.IP_estadoCivil AS EstadoCivil,
      fpn.IP_nacionalidad AS Nacionalidad,
      fpn.IP_documento,
      fpn.IP_genero AS gen,
      fpn.DIF_Ingresos_mensuales AS Ingresosmensuales ,
      fpn.DIF_Otros_ingresos AS Otrosingresos,
      fpn.IT_Declara_renta AS Renta ,
      fpn.IP_fechaExpedicion AS Fechaexpedicion,
      fpn.ICP_direcResidencia AS Direccion, 
      fpn.ICP_barrio AS Barrio,
      fpn.ICP_ciudad_municipio AS Ciudad, 
      fpn.ICP_departamento AS Depa, 
      fpn.ICP_pais AS Pais,
      fpn.ICP_telefono AS Telefono ,
      fpn.ICP_celular AS Celular ,
      fpn.ICP_email AS Correo,
      fpn.AE_profesion AS Profesion , 
      fpn.AE_ocupacion AS Ocupacion,
      fpn.AE_detalle_act AS Actividad ,
      fpn.IP_tipoDoc AS Tipodocumento
      FROM
      cliente AS c
      JOIN FormPersonNatural AS fpn ON c.id_formpn = fpn.id_formpn
      `);

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No se encontraron resultados." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getSearch,
};
