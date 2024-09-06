const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const userAccounts = async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM detalle_cuenta WHERE id_cliente = $1 ORDER BY fecha ASC",
      [id_cliente]
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No se encontraron resultados." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud: ", error });
  }
};

module.exports = {
  userAccounts,
};
