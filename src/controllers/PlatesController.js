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
        const { title, ingredients, plate_id } = request.query;

        let plates;

        if (ingredients) {
            const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());

            plates = await knex("ingredients")
                .select([
                    "plates.id",
                    "plates.title",            
                ])
                .where("ingredients.plate_id", plate_id)
                .whereIn("name", filterIngredients)
                .innerJoin("plates", "plates.id", "ingredients.plate_id")
                

        } else {
            plates = await knex("plates")
                .where({ plate_id: plate_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
        }

        const ingredient = await knex("ingredients");
        const platesWithIngredients = plates.map(plate => {

            const  plateIngredient = ingredient.filter(ingredient => ingredient.plate_id === plate_id);
        
            return {
                ...plate,
                ingredients: plateIngredient
            }
        
        });

        return response.json(platesWithIngredients)
    }

};

module.exports = PlatesController;