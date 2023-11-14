const knex = require("../database/knex");

class PlatesController {
    async create(request, response) {
        const { title, description, ingredients } = request.body;

        
    }
};

module.exports = PlatesController;