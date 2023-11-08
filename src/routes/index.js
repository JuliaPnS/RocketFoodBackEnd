const { Router } = require("express");

usersRouter = require("./users.routes");

const routes = Router();

routes.use("/users", usersRouter);

module.exports = routes;