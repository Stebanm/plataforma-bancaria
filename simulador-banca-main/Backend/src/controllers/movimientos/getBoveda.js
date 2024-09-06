const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getBoveda = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM boveda ORDER BY fecha DESC LIMIT 1"
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json({ message: "No se encontraron resultados." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getBoveda,
};
