const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password} = request.body;

        const database = await sqliteConnection();
        const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUsersExists) {
            throw new AppError("Esse e-mail já está cadastrado!");
        }

        if(password.length < 6) {
            throw new AppError("A senha precisa ter no mínimo 6 caracteres")
        }

        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
        );

        return response.status(201).json();
    }
    
    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if(!user) {
            throw new AppError("Usuário não existe!");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Esse e-mail já está sendo usado.");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password) {
            throw new AppError("Informe a senha antiga para definir a nova!");
        }

        if(password && old_password) {
            const checkOldPassoword = await compare(old_password, user.password);

            if(!checkOldPassoword) {
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        }

       await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?, 
        updated_at = ?
        WHERE id = ?`,
        [user.name, user.email, user.password, new Date(), user_id]
        );

        return response.json();
    }
};

module.exports = UsersController;