const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const updateUser = async (req, res) => {
  const userId = req.params.id; // Obtén el ID del usuario de los parámetros de la ruta
  const updateUser = req.body; // Obtén los nuevos datos del usuario desde el cuerpo de la solicitud

  try {
    const { username, password } = updateUser; // Ajusta estos nombres según el frontend
    // Realiza la actualización en la base de datos utilizando el ID
    const updateQuery =
      "UPDATE empleado SET username = $1, password = $2 WHERE id_empleado = $3";
    const updateValues = [username, password, userId];
    await pool.query(updateQuery, updateValues);
    res.status(200).json({ message: "Actualización de usuario exitosa" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  updateUser,
};
