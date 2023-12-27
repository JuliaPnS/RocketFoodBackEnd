const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const PlatesController = require("../controllers/PlatesController");

const platesController = new PlatesController();
const ensureuAuthenticated = require("../middlewares/ensureAuthenticated");

const platesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

platesRoutes.post("/", platesController.create);
platesRoutes.get("/", platesController.index);
platesRoutes.get("/:id", platesController.show);
platesRoutes.delete("/:id", platesController.delete);
platesRoutes.patch("/plateImage", ensureuAuthenticated, upload.single("plate image"), (request, response) => {
    console.log(request.file.filename);
    response.json();
});

module.exports = platesRoutes;