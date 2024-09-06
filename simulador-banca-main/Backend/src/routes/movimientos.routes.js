const express = require("express");
const router = express.Router();

const postMovimietos = require("../controllers/movimientos/postMovimientos");
const postDevolver = require("../controllers/movimientos/postDevolver");
const entradaBoveda = require("../controllers/movimientos/entradaBoveda");
const salidaBoveda = require("../controllers/movimientos/salidaBoveda");
const getBoveda = require("../controllers/movimientos/getBoveda");
const getMovimientos = require("../controllers/movimientos/getMovimientos");
const userMovimientos = require("../controllers/movimientos/userMovimientos");

router.get("/get_boveda", getBoveda.getBoveda);
router.get("/get_movimientos", getMovimientos.getMovimientos);
router.get(
  "/user_movimientos/:accountMovimientos",
  userMovimientos.userMovimientos
);
router.post("/post_movimiento", postMovimietos.postMovimietos);
router.post("/post_devolver", postDevolver.postDevolver);
router.post("/entrada_boveda/:idEmpleado", entradaBoveda.entradaBoveda);
router.post("/salida_boveda/:idEmpleado", salidaBoveda.salidaBoveda);

module.exports = router;
