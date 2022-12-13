import { InferAttributes } from "sequelize";
import { Todo } from "../models/Todo.model";

// Create operation 

export const createTodo = async (description: string) => {
    try {
        // El create llama a .build y .save al mismo tiempo
        const newTodo = await Todo.create({
            description
        });

        return newTodo.id;
    } catch (error) {
        console.log(error);
    }
}

export const fetchTodoById = async (id: number) => {
    try {
        const foundTodo = await Todo.findByPk(id);
        return foundTodo;
    } catch (error) {
        console.log(error);
        return null;

    }
}

export const updateTodoById = async (id: number, todoModel: InferAttributes<Todo>) => {
    try {
        const foo = await Todo.update({
            description: todoModel.description,
            is_completed: todoModel.is_completed
        }, {
            where: {
                id: id
            }
        })

        return foo;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteTodoById = async (id: number) => {
    try {
        const foo = await Todo.destroy({
            where: {
                id: id
            }
        })

        return foo;
    } catch (error) {
        console.log(error);
        return null;
    }
}