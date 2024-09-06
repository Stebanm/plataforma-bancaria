const { Pool } = require("pg");
const { CONFIG_BD } = require("../../../config/db");

const pool = new Pool(CONFIG_BD);

const clientStatus = async (req, res) => {
  const Id = req.params.id;
  const estado = req.body.nuevoEstado;

  try {
    // Verifica que estado esté definido antes de utilizarlo
    if (typeof estado !== "undefined") {
      // Realiza la actualización en la base de datos utilizando el ID
      const updateQueryA =
        "UPDATE detalle_cuenta SET estado = $1 WHERE id_detalle = $2";
      const updateValuesA = [estado, Id];
      await pool.query(updateQueryA, updateValuesA);

      res
        .status(200)
        .json({ message: "Actualización de autorización exitosa" });
    } else {
      console.error(
        "El valor de nuevoEstado no está definido en el cuerpo de la solicitud."
      );
      res.status(400).json({
        message:
          "Bad Request: El valor de nuevoEstado no está definido en el cuerpo de la solicitud.",
      });
    }
  } catch (error) {
    console.log(req.body);
    console.error("Error al actualizar la autorización:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
module.exports = {
  clientStatus,
};
