import { Request, Response, NextFunction } from "express";
import { default as TodoItem, TodoModel } from "../../models/mongo/TodoItem";
import { Document } from "mongoose";
import * as todoService from "./todo.service";
import { ABError } from "../../models/ABError";

/**
 * GET /todos
 * todos api endpoint
 */
export let getTodos = (req: Request, res: Response, next: NextFunction) => {
    todoService.getTodos()
        .then((todos: Document[]) => { res.send(todos); })
        .catch(err => {
            res.locals.err = err;
            next();
        });
};

export let getTodoItem = (req: Request, res: Response, next: NextFunction) => {
    todoService.getTodoItem(req)
        .then((todo: Document) => { res.send(todo); })
        .catch((err: ABError) => { res.status(err.status).send(err); });
};

export let postTodoItem = (req: Request, res: Response, next: NextFunction) => {
    todoService.postTodoItem(req)
        .then((todo: Document) => { res.send(todo); })
        .catch((err: ABError) => { res.status(err.status).send(err); });
};

export let putTodoItem = (req: Request, res: Response) => {
    todoService.putTodoItem(req)
        .then((todo: Document) => { res.status(200).send(todo); })
        .catch((err: ABError) => { res.status(err.status).send(err); });
};

export let deleteTodoItem = (req: Request, res: Response) => {
    todoService.deleteTodoItem(req)
        .then((todo: Document) => { res.status(204).send(); })
        .catch((err: ABError) => { res.status(err.status).send(err); });
};

