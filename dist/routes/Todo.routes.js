"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
const express_1 = require("express");
const Todo_repo_1 = require("../repository/Todo.repo");
exports.TodoRouter = (0, express_1.Router)();
exports.TodoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const description = req.body.description;
    if (!description) {
        res.status(400);
        return res.send({
            message: 'No description'
        });
    }
    const newTodoId = yield (0, Todo_repo_1.createTodo)(description);
    res.status(201);
    res.send({
        id: newTodoId
    });
}));
exports.TodoRouter.get('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundTodo = yield (0, Todo_repo_1.fetchTodoById)(todoId);
    if (!foundTodo) {
        res.status(400);
        return res.send({
            error: 'Todo not found'
        });
    }
    res.send({
        id: foundTodo.id,
        description: foundTodo.description,
        is_completed: foundTodo.is_completed
    });
}));
exports.TodoRouter.put('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    const body = req.body;
    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, Todo_repo_1.updateTodoById)(todoId, body);
    if (!affectedRows) {
        res.status(500);
        return res.send({
            error: 'Something went wrong!'
        });
    }
    if (affectedRows[0] === 0) {
        res.status(400);
        return res.send({
            error: 'Update failed'
        });
    }
    const foundTodo = yield (0, Todo_repo_1.fetchTodoById)(todoId);
    res.status(200);
    return res.send(foundTodo);
}));
exports.TodoRouter.delete('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const ar = yield (0, Todo_repo_1.deleteTodoById)(todoId);
    if (!ar) {
        res.status(400);
        return res.send({
            error: 'Cannot delete'
        });
    }
    return res.sendStatus(204);
}));
