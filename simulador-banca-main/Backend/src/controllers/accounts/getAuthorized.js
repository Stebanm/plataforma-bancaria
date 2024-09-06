const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getAuthorized = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      dc.id_detalle,
      c.id_cliente,
      fpn.ip_primerNombre AS nombre,
      fpn.ip_documento,
      tc.descripcion,
      dc.num_cuenta,
      dc.estado AS estado_cliente,
      dc.fecha
      FROM detalle_cuenta AS dc
      JOIN cliente AS c ON dc.id_cliente = c.id_cliente
      JOIN formpersonnatural AS fpn ON c.id_formpn = fpn.id_formpn
      JOIN tipo_cuentas AS tc ON dc.id_tcuenta = tc.id_tcuenta
      WHERE dc.estado = 'Autorizado';
    `);

    if (result.rows.length > 0) {
      return res.status(200).json({ result });
    } else {
      return res.status(404).json({ message: "No se encontraron resultados." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getAuthorized,
};
