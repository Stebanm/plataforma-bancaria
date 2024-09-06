const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getClient = async (req, res) => {
  const { userName } = req.params;
  try {
    // Realizar la consulta SQL para obtener todos los clientes
    const userDetailsQuery = `
      SELECT
      dc.id_detalle,
      c.id_cliente,
      fpn.ip_primerNombre AS nombre,
      fpn.ip_primerApellido,
      fpn.ip_segundoApellido,
      fpn.ip_tipodoc,
      fpn.ip_documento AS documento,
      dc.num_cuenta,
      dc.saldo,
      tc.descripcion,
      dc.estado AS estado_cuenta,
      dc.fecha
      FROM detalle_cuenta AS dc
      JOIN cliente AS c ON dc.id_cliente = c.id_cliente
      JOIN formpersonnatural AS fpn ON c.id_formpn = fpn.id_formpn
      JOIN tipo_cuentas AS tc ON dc.id_tcuenta = tc.id_tcuenta
      WHERE fpn.ip_documento = $1
      ORDER BY dc.fecha ASC`;

    // Ejecutar la consulta SQL

    const userValue = [userName];
    const userDetailsResult = await pool.query(userDetailsQuery, userValue);

    // Verificar si se encontraron detalles de los usuarios
    if (userDetailsResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron detalles para los usuarios" });
    }

    // Devolver los detalles encontrados en la respuesta
    res.status(200).json(userDetailsResult.rows);
  } catch (error) {
    console.error("Error al obtener detalles de los usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getClient,
};
