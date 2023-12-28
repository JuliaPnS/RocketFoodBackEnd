const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ImagePlateController {
    async update(request, response) {
        const { id } = request.params;
        const imagePlateFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const plate = await knex("plates").where({ id }).first();

        if (plate.image) {
            await diskStorage.deleteFile(plate.image);
        }

        const filename = await diskStorage.saveFile(imagePlateFilename);
        plate.image = filename;

        await knex("plates").update(plate).where({ id });

        return response.json(plate);
    }
}

module.exports = ImagePlateController