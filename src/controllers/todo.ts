import { Request, Response } from "express";
import { default as TodoItem, TodoModel } from "../models/mongo/TodoItem";
import { Document } from "mongoose";

/**
 * GET /todos
 * todos api endpoint
 */
export let getTodos = (req: Request, res: Response) => {
    TodoItem.find({}, (err: any, product: Document[]) => {
        if (err) res.send(err);
        else res.send(product);
    });
};

export let getTodoItem = (req: Request, res: Response) => {
    req.checkParams("id", "must include a valid mongo id in the request parameter").isMongoId();
    const errors = req.validationErrors();

    if (errors)
        res.send(errors).status(400);
    else {
        TodoItem.findOne({ _id: req.params.id }, (err: any, product: Document) => {
            if (err) res.send(err);
            else {
                if (!product)
                    res.send(`todo item with ${req.params.id} not found`).status(404);
                else
                    res.send(product);
            }
        });
    }
};

export let postTodoItem = (req: Request, res: Response) => {
    req.checkBody("description", "must include a field in the body named 'description'").exists();
    req.checkBody("description", "field 'description' must not be empty").notEmpty();

    const errors = req.validationErrors();

    if (errors)
        res.send(errors).status(400);
    else {
        const todoItem = new TodoItem({
            description: req.body.description,
            completed: (req.body.completed) ? req.body.completed : false
        });
        todoItem.save((err: any, product: Document, numAffected: number) => {
            if (err) res.send(err);
            else res.send(product);
        });
    }
};

export let putTodoItem = (req: Request, res: Response) => {
    req.checkParams("id", "must include a valid mongo id in the request parameter").isMongoId();
    const errors = req.validationErrors();

    const bodyValid: boolean = (!req.body.description && !req.body.completed) ? false : true;

    if (errors)
        res.send(errors).status(400);
    else if (!bodyValid) {
        let paramErrorString: string = "";
        // TODO: come back to this - its like a coding interview thing
        if (!req.body.description) paramErrorString += "body.description ";
        if (!req.body.completed) paramErrorString += "body.completed ";

        res.send({
            "location": "body",
            "param": paramErrorString,
            "msg": "must include a description or completed in the request body",
            "value": req.body
        }).status(400);
    }
    else {
        const todoItem: object = {
            description: (req.body.description) ? req.body.description : undefined,
            completed: (req.body.completed) ? req.body.completed : undefined
        };
        TodoItem.findByIdAndUpdate(req.params.id, todoItem, (err: any, product: Document) => {
            if (err) res.send(err);
            else res.send().status(200);
        });
    }
};

export let deleteTodoItem = (req: Request, res: Response) => {
    req.checkParams("id", "must include a valid mongo id in the request parameter").isMongoId();
    const errors = req.validationErrors();


    if (errors)
        res.send(errors).status(400);
    else {
        TodoItem.findOneAndRemove({ _id: req.params.id }, (err: any, product: Document) => {
            if (err) res.send(err);
            if (!product)
                res.send(`todo item with ${req.params.id} not found`).status(404);
            else
                res.send().status(204);
        });
    }
};
