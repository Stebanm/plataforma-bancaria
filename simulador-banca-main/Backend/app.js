const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
require("dotenv").config();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());
// Configuracion de Swagger

const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configuración de Rutas

const userRoutes = require("./src/routes/users.routes");
const detailsRoutes = require("./src/routes/details.routes");
const formsRoutes = require("./src/routes/form.routes");
const clientRoutes = require("./src/routes/client.routes");
const movimientos = require("./src/routes/movimientos.routes");
app.use("/", userRoutes, detailsRoutes, formsRoutes, clientRoutes, movimientos);

// Puerto en el que el servidor escuchará las peticiones
const puerto = 3000;

app.listen(puerto, () => {
  console.log(`Servidor escuchando en ${process.env.HOST}`);
});
