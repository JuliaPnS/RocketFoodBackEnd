const knex = require("../database/knex");
const AppError = require("../utils/AppError");

function getCategory(category) {
    let categories= {
        "refeicoes": "Refeições",
        "pratosPrincipais": "Pratos Principais",
        "bebidas": "Bebidas",
        "sobremesas": "Sobremesas"
    }

    return categories[category]
}

class PlatesController {
    async create(request, response) {
        const { title, description, ingredients, category, price } = request.body;

        const [plate_id] = await knex("plates").insert({
            title,
            description,
            category,
            price
        });

        const ingredientsInsert = ingredients.map(name => {
            return {
                plate_id,
                name
            }
        });

        await knex("ingredients").insert(ingredientsInsert);

        return response.json({id: plate_id});
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
                    "plates.image",
                    "plates.description",
                    "plates.price"
                ])
                .whereLike("title", `%${search}%`).orWhereLike("name", `%${search}%`)
                .innerJoin("ingredients", "plates.id", "ingredients.plate_id").distinct()

        } else {
            plates = await knex("plates")
                .orderBy("title");
        }

        let ingredients = await knex("ingredients")
        plates = plates.map(plate => {

            let filteredIngredients = ingredients.filter(ingredient => {
               return ingredient.plate_id == plate.id
       
            })

            console.log(plates)

            return {
                "id": plate.id,
                "title": plate.title,
                "ingredients": filteredIngredients,
                "price": plate.price,
                "description": plate.description,
                "image": `http://localhost:3337/files/${plate.image}`,
                "category": getCategory(plate.category)
            }



        })

        return response.json(plates)
    }

};

module.exports = PlatesController;