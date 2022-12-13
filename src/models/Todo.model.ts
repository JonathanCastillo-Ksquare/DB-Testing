import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from 'sequelize';

export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>>{
    declare id: CreationOptional<number>;
    declare description: string;
    declare is_completed: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }
}

export const initTodoModel = (sequelize: Sequelize) => {
    Todo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: DataTypes.STRING,
        is_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    }, {
        sequelize
    })
}