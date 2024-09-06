const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el username ya está registrado como empleado
    const employeeQuery = "SELECT * FROM empleado WHERE username = $1";
    const employeeResult = await pool.query(employeeQuery, [username]);

    // Verificar si el username ya está registrado como cliente
    const clientQuery = "SELECT * FROM cliente WHERE username = $1";
    const clientResult = await pool.query(clientQuery, [username]);

    if (employeeResult.rows.length === 0 && clientResult.rows.length === 0) {
      return res.status(400).json({ message: "El usuario no está registrado" });
    }

    // Verificar el password para el empleado o el cliente
    let userType;
    let userData;
    if (employeeResult.rows.length > 0) {
      userType = "empleado";
      userData = employeeResult.rows[0];
    } else {
      userType = "cliente";
      userData = clientResult.rows[0];
    }

    const bankPassword = userData.password;

    if (password !== bankPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Acceder a los datos del usuario en la respuesta
    userData.rol = userType;

    // Enviar los datos del usuario en la respuesta JSON
    res
      .status(200)
      .json({ message: "Inicio de sesión exitoso", user: userData });
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  loginUser,
};
