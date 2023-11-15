const knex = require("../database/knex");

class PlatesController {
    async create(request, response) {
        const { title, description, ingredients } = request.body;
 
        const [plate_id] = await knex("plates").insert({
            title, description, ingredients
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
};

module.exports = PlatesController;