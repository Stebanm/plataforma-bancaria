const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const getAccount = async (req, res) => {
  try {
    // Obtén el número de cuenta proporcionado en la URL
    const { accountNumberInt } = req.params;

    // Consulta SQL modificada para filtrar por el número de cuenta
    const clienteQuery = `
      SELECT 
      dc.id_detalle,
      c.id_cliente, 
      fpn.ip_primerNombre AS primerNombre, 
      fpn.ip_primerApellido AS primerApellido, 
      fpn.ip_segundoApellido AS segundoApellido,
      dc.num_cuenta,
      dc.saldo,
      dc.estado,
      tc.descripcion
      FROM cliente AS c
      JOIN detalle_cuenta AS dc ON c.id_cliente = dc.id_cliente
      JOIN tipo_cuentas AS tc ON tc.id_tcuenta = dc.id_tcuenta
      JOIN formpersonnatural AS fpn ON c.id_formpn = fpn.id_formpn
      WHERE dc.num_cuenta = $1
    `;

    const clienteValue = [accountNumberInt];
    const clienteInfo = await pool.query(clienteQuery, clienteValue);

    // Verifica si se encontraron datos
    if (clienteInfo.rows.length > 0) {
      // Si se encontraron datos, envía el primer resultado al cliente
      res.status(200).json(clienteInfo.rows[0]);
    } else {
      // Si no se encontraron datos, envía un mensaje indicando que no se encontró ningún cliente con el número de cuenta proporcionado
      res.status(404).json({
        message:
          "No se encontró ningún cliente con el número de cuenta proporcionado",
      });
    }
  } catch (error) {
    console.error("Error al obtener información del cliente:", error.message);
    res.status(500).json({ error: "Error al obtener información del cliente" });
  }
};
module.exports = {
  getAccount,
};
