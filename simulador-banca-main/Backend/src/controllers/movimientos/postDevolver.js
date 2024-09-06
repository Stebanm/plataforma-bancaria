const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const postDevolver = async (req, res) => {
  const id_empleado = req.body.idEmpleado;
  const saldo = req.body.saldo;
  const id_tipomov = req.body.tipoMovimiento;
  const id_empleado_consing = req.body.empleadoConsing;

  try {
    const resultBoveda = await pool.query(
      "SELECT * FROM boveda ORDER BY fecha DESC LIMIT 1"
    );

    const id_boveda = resultBoveda.rows[0].id_boveda;

    const result = await pool.query(
      "INSERT INTO movimientos (id_empleado, id_tipomov, id_boveda, saldo, id_empleado_consing) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_empleado, id_tipomov, id_boveda, saldo, id_empleado_consing]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error al registrar movimiento: ", error);
    res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud: ", error });
  }
};

module.exports = {
  postDevolver,
};
