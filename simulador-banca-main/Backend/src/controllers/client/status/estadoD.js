const { Pool } = require("pg");
const { CONFIG_BD } = require("../../../config/db");

const pool = new Pool(CONFIG_BD);

const EstadoD = async (req, res) => {
  const Id = req.params.id;
  const estado = req.body.nuevoEstado;
  const razon = req.body.descripcion; // Añadir el campo "descripcion" del cuerpo de la solicitud

  try {
    // Verifica que estado esté definido antes de utilizarlo
    if (typeof estado !== "undefined") {
      // Realiza la actualización en la base de datos utilizando el ID
      const updateQueryA =
        "UPDATE detalle_cuenta SET estado = $1, razon_rechazo = $2 WHERE id_detalle = $3"; // Modificar la consulta para incluir la razon
      const updateValuesA = [estado, razon, Id]; // Modificar los valores para incluir la razon
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
  EstadoD,
};
