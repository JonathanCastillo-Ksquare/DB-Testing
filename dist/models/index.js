"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Todo_model_1 = require("./Todo.model"); //models
const models = [Todo_model_1.initTodoModel];
const startSequelize = (dbName, dbPass, dbHostname, dbUser) => {
    exports.sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
        dialect: 'postgres',
        host: dbHostname
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    return exports.sequelize;
};
exports.startSequelize = startSequelize;
