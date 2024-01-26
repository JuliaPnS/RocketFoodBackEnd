const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const PlatesController = require("../controllers/PlatesController");
const ImagePlateController = require("../controllers/ImagePlateController");

const platesController = new PlatesController();
const imagePlateController = new ImagePlateController();

const platesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

platesRoutes.post("/", platesController.create);
platesRoutes.get("/", platesController.index);
platesRoutes.get('/:id', platesController.show);
platesRoutes.delete("/:id", platesController.delete);
platesRoutes.patch("/plateImage/:id", upload.single("image"), imagePlateController.update);

module.exports = platesRoutes;