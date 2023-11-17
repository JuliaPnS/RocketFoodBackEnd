const { Router } = require("express");

const PlatesController = require("../controllers/PlatesController");

const platesController = new PlatesController();

const platesRoutes = Router();

platesRoutes.post("/", platesController.create);
platesRoutes.get("/", platesController.index);
platesRoutes.get("/:id", platesController.show);
platesRoutes.delete("/:id", platesController.delete);

module.exports = platesRoutes;