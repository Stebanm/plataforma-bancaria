const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getDetails = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM detalle_cuenta");

    if (result.rows.length > 0) {
      return res.status(200).json({ result });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getDetails,
};
