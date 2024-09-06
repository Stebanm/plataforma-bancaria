const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getMovimientos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      mov.id_movimiento,
      em.username AS empleado,
      rol.descripcion AS rol,
      fpn.ip_primernombre AS cliente,
      dc.num_cuenta,
      tm.descripcion AS tipo_movimiento,
      mov.id_empleado_consing AS consing_em,
      consing_em.username AS empleado_consing,
      consing_rol.descripcion AS rol_consing,
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
      ORDER BY id_movimiento DESC
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
  getMovimientos,
};
