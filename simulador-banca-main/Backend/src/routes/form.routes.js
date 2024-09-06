const express = require("express");
const router = express.Router();

const naturalForm = require("../controllers/forms/addNaturalForm");

router.post("/add_natural/:id", naturalForm.addNaturalForm);

module.exports = router;
