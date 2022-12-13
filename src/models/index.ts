import { Sequelize } from "sequelize";
import { initTodoModel } from "./Todo.model"; //models

export let sequelize: Sequelize;

const models = [initTodoModel];

export const startSequelize = (dbName: string, dbPass: string, dbHostname: string, dbUser: string) => {
    sequelize = new Sequelize(dbName, dbUser, dbPass, {
        dialect: 'postgres',
        host: dbHostname

    });

    for (const initModel of models) {
        initModel(sequelize);
    }


    return sequelize;
}