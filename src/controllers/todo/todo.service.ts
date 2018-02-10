
import * as bluebird from "bluebird";
import { default as TodoItem, TodoModel } from "../../models/mongo/TodoItem";
import { Document } from "mongoose";
import { ABError } from "../../models/ABError";
import { Request } from "express";
import { MappedError } from "express-validator/shared-typings";
import * as todoRequestValidator from "../request-validators/todo.req-validate";
import * as errorHandler from "../../error-handlers/errorHandlers";

/* GET /todos */
export let getTodos = (): Promise<Document[]> => {
    return new Promise(function (resolve, reject) {
        TodoItem.find({}, (err: any, product: Document[]) => {
            if (err) reject(errorHandler.handleTodoError(err));
            else resolve(product);
        });
    });
};

/* GET /todo:id */
export let getTodoItem = (req: Request): Promise<Document> => {
    return new Promise(function (resolve, reject) {
        // check request for errors
        const errors = todoRequestValidator.checkGetTodoItemRequest(req);
        if (errors) return reject(errorHandler.handleTodoError(errors, "Invalid Request", 400));

        // no request errors, try to find todo item
        TodoItem.findOne({ _id: req.params.id }, (err: any, product: Document) => {
            if (err) reject(errorHandler.handleTodoError(err));
            if (!product) reject(errorHandler.handleTodoError(null, `todo item with ${req.params.id} not found`, 404));
            resolve(product); // return todo item
        });
    });
};

/* POST /todos */
export let postTodoItem = (req: Request): Promise<Document> => {
    return new Promise(function (resolve, reject) {
        // check request for errors
        const errors = todoRequestValidator.checkPostTodoItemRequest(req);
        if (errors) return reject(errorHandler.handleTodoError(errors, "Invalid Request", 400));

        // construct todoItem
        const todoItem = new TodoItem({
            description: req.body.description,
            completed: (req.body.completed) ? req.body.completed : false
        });

        // save to db
        todoItem.save((err: any, product: Document, numAffected: number) => {
            if (err) reject(errorHandler.handleTodoError(err, null, 500));
            else resolve(product);
        });
    });
};

/* PUT /todos/:id */
export let putTodoItem = (req: Request): Promise<Document> => {
    return new Promise(function (resolve, reject) {
        // check request for errors
        const errors = todoRequestValidator.checkPutTodoItemRequest(req);
        if (errors) return reject(errorHandler.handleTodoError(errors, "Invalid Request", 400));

        TodoItem.findOne({ _id: req.params.id }, (err: any, product: Document) => {
            if (err) reject(errorHandler.handleTodoError(err));
            if (!product) reject(errorHandler.handleTodoError(null, `todo item with ${req.params.id} not found`, 404));

            // TODO: come back and fix this
            const todoItem: object = {
                description: (req.body.description) ? req.body.description : product["description"],
                completed: (req.body.completed) ? req.body.completed : product["completed"]
            };

            TodoItem.findByIdAndUpdate(req.params.id, todoItem, (err: any, product: Document) => {
                if (err) reject(errorHandler.handleTodoError(err, null, 500));
                else resolve();
            });
        });
    });
};

/* DELETE todos/:id */
export let deleteTodoItem = (req: Request): Promise<Document> => {
    return new Promise(function (resolve, reject) {
        // check request for errors
        const errors = todoRequestValidator.checkDeleteTodoItemRequest(req);
        if (errors) return reject(errorHandler.handleTodoError(errors, "Invalid Request", 400));

        TodoItem.findOneAndRemove({ _id: req.params.id }, (err: any, product: Document) => {
            if (err) reject(errorHandler.handleTodoError(err));
            if (!product) reject(errorHandler.handleTodoError(null, `todo item with ${req.params.id} not found`, 404));
            resolve();
        });
    });
};
