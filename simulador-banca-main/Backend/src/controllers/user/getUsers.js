const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM empleado ORDER BY id_empleado ASC"
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUsers,
};
