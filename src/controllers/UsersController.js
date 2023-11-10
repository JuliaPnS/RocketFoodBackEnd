const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password, plate} = request.body;

        const database = await sqliteConnection();
        const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUsersExists) {
            throw new AppError("Esse e-mail já está cadastrado!");
        }

        return response.status(201).json();
    }
};

module.exports = UsersController;