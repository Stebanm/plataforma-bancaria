const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const firstConsing = async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT
    dc.id_detalle,
    fpn.ip_primerNombre AS nombre,
    fpn.ip_primerapellido AS p_apellido,
    fpn.ip_segundoapellido AS s_apellido,
    tc.descripcion,
    dc.num_cuenta,
    dc.saldo,
    dc.estado AS estado_cliente
    FROM detalle_cuenta AS dc
    JOIN cliente AS c ON dc.id_cliente = c.id_cliente
    JOIN FormPersonNatural AS fpn ON c.id_formpn = fpn.id_formpn
    JOIN tipo_cuentas AS tc ON dc.id_tcuenta = tc.id_tcuenta
    WHERE dc.estado = 'Consignar'
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
  firstConsing,
};
