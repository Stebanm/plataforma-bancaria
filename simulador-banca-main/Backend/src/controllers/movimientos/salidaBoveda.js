const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const salidaBoveda = async (req, res) => {
  const idEmpleado = req.params.idEmpleado;
  const saldo_boveda = req.body.nuevoSaldo;
  const salida_saldo = req.body.salidaSaldo;

  try {
    const resultMovimiento = await pool.query(
      "INSERT INTO movimientos (id_empleado, id_tipomov, saldo) VALUES ($1, $2, $3) RETURNING id_movimiento",
      [idEmpleado, 4, salida_saldo]
    );

    const id_movimiento = resultMovimiento.rows[0].id_movimiento;

    const resultBoveda = await pool.query(
      "INSERT INTO boveda (id_movimiento, saldo_boveda, entrada_saldo, salida_saldo) VALUES ($1, $2, $3, $4) RETURNING id_boveda",
      [id_movimiento, saldo_boveda, 0, salida_saldo]
    );

    const id_boveda = resultBoveda.rows[0].id_boveda;

    const updateMovimiento = await pool.query(
      "UPDATE movimientos SET id_boveda = $1 WHERE id_movimiento = $2",
      [id_boveda, id_movimiento]
    );

    res.status(201).json(updateMovimiento.rows[0]);
  } catch (error) {
    console.log("Error al registrar movimiento en bóveda: ", error);
    res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud: ", error });
  }
};

module.exports = {
  salidaBoveda,
};
