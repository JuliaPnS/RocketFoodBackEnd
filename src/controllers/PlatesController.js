const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");


class PlatesController {
    async create(request, response) {
        const { title, description, ingredients } = request.body;

        const [plate_id] = await knex("plates").insert({
            title,
            description,
        });

        const ingredientsInsert = ingredients.map(name => {
            return {
                plate_id,
                name
            }
        });

        await knex("ingredients").insert(ingredientsInsert);

        response.json();

    }

    async show(request, response) {
        const { id } = request.params;

        const plate = await knex("plates").where({ id }).first();
        const ingredients = await knex("ingredients").where({ plate_id: id }).orderBy("name");

        return response.json({
            ...plate,
            ingredients,
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("plates").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { search } = request.query;

        let plates;

        if (search) {
            plates = await knex("plates")
                .select([
                    "plates.id",
                    "plates.title",
                ])
                .whereLike("title",`%${search}%` ).orWhereLike("name", `%${search}%`)
                .innerJoin("ingredients", "plates.id", "ingredients.plate_id").distinct()

        } else {
            plates = await knex("plates")
                .orderBy("title");
        }

            plates = plates.map(plate => {

             async function getIngredients(plate_id) {
                let ingredients =  await knex("ingredients").select("name").where("plate_id", plate_id)

                    return ingredients
            }
            return {
                "id": plate.id,
                "title": plate.title,
                "ingredients": getIngredients(plate.id)
            }
           
            
        })

        return response.json(plates)
    }

};

module.exports = PlatesController;