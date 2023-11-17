const knex = require("../database/knex");

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

        const plates = await knex("plates").orderBy("title");

        return response.json({ plates })
    }
};

module.exports = PlatesController;