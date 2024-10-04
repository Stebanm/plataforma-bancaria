const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const accountMovimientos = async (req, res) => {
  const { accountMovimientos } = req.params;
  try {
    const result = `
      SELECT
      dc.id_detalle,
      mov.id_movimiento,
      em.username AS empleado,
      rol.descripcion AS rol,
      fpn.ip_primernombre AS cliente,
      c.username,
      dc.num_cuenta,
      dc.estado,
      tm.descripcion AS tipo_movimiento,
      tm.id_tipomov,
      mov.saldo,
      mov.fecha
      FROM movimientos AS mov
      LEFT JOIN detalle_cuenta AS dc ON mov.id_detalle = dc.id_detalle
      LEFT JOIN cliente AS c ON dc.id_cliente = c.id_cliente
      LEFT JOIN formpersonnatural AS fpn ON c.id_formpn = fpn.id_formpn
      LEFT JOIN tipo_movimiento AS tm ON mov.id_tipomov = tm.id_tipomov
      LEFT JOIN empleado AS em ON mov.id_empleado = em.id_empleado
      LEFT JOIN rol ON em.id_rol = rol.id_rol
      LEFT JOIN empleado AS consing_em ON mov.id_empleado_consing = consing_em.id_empleado
      LEFT JOIN rol AS consing_rol ON consing_em.id_rol = consing_rol.id_rol
      WHERE dc.id_detalle = $1
      ORDER BY dc.id_detalle DESC
    `;

    const clienteValue = [accountMovimientos];
    const clienteInfo = await pool.query(result, clienteValue);

    if (clienteInfo.rows.length > 0) {
      return res.status(200).json(clienteInfo.rows);
    } else {
      return res.status(404).json({ message: "No se encontraron resultados." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  accountMovimientos,
};
