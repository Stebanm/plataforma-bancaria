const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const createAccount = async (req, res) => {
  const { id_cliente } = req.params;
  const id_empleado = req.body.idEmpleado;
  const id_tcuenta = req.body.tipoCuenta;

  try {
    const result = await pool.query(
      "INSERT INTO detalle_cuenta (id_cliente, id_tcuenta, id_empleado, saldo, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_cliente, id_tcuenta, id_empleado, 0, "Autorizado"]
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
  createAccount,
};
