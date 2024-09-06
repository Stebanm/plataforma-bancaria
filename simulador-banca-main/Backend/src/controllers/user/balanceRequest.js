const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const balanceRequest = async (req, res) => {
  const idEmpleado = req.params.idEmpleado;
  const saldo = req.body.nuevoSaldo;
  const status = req.body.newStatus;
  const saldoSolicitado = req.body.saldoSolicitado;

  try {
    // Verifica que status esté definido antes de utilizarlo
    if (typeof status !== "undefined") {
      // Realiza la actualización en la base de datos utilizando el ID
      const updateQuery = await pool.query(
        "UPDATE empleado SET estado = $1, saldo_solicitado = $2 WHERE id_empleado = $3",
        [status, saldoSolicitado, idEmpleado]
      );

      if (saldo !== undefined) {
        const updateSaldo = await pool.query(
          "UPDATE empleado SET saldo = $1 WHERE id_empleado = $2",
          [saldo, idEmpleado]
        );
      }

      res.status(200).json({ message: "Actualización de estado exitosa" });
    } else {
      console.error(
        "El valor de estado no está definido en el cuerpo de la solicitud."
      );
      res.status(400).json({
        message:
          "Bad Request: El valor de estado no está definido en el cuerpo de la solicitud.",
      });
    }
  } catch (error) {
    console.log(req.body);
    console.error("Error al actualizar el estado:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  balanceRequest,
};
