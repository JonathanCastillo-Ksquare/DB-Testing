"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// configuracion de express en su propio archivo
const express_1 = __importDefault(require("express"));
const Todo_routes_1 = require("./routes/Todo.routes");
const User_routes_1 = require("./routes/User.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/todos', Todo_routes_1.TodoRouter);
//Firebase
app.use('/users', User_routes_1.UserRouter);
app.get('/', (req, res) => {
    res.send('VIVEEEEEEEE!');
});
exports.default = app;
