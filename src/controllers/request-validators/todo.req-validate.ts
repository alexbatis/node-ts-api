
import { ABError } from "../../models/ABError";
import { Request } from "express";

export const checkGetTodoItemRequest = (req: Request) => {
    req.checkParams("id", "must include a valid mongo id in the request parameter").isMongoId();
    return (req.validationErrors()) ? req.validationErrors() : null;
};

export const checkPostTodoItemRequest = (req: Request) => {
    req.checkBody("description", "must include a field in the body named 'description'").exists();
    req.checkBody("description", "field 'description' must not be empty").notEmpty();

    return (req.validationErrors()) ? req.validationErrors() : null;
};

export const checkPutTodoItemRequest = (req: Request) => {
    req.checkParams("id", "must include a valid mongo id in the request parameter").isMongoId();
    if (req.validationErrors())
        return req.validationErrors();

    const bodyValid: boolean = (req.body.description === undefined && req.body.completed === undefined) ? false : true;

    if (!bodyValid) {
        let paramErrorString: string = "";
        // TODO: come back to this - its like a coding interview thing
        if (!req.body.description) paramErrorString += "body.description ";
        if (!req.body.completed) paramErrorString += "body.completed ";

        return {
            "location": "body",
            "param": paramErrorString,
            "msg": "must include a description or completed in the request body",
            "value": req.body
        };
    }
    if (typeof req.body.completed != "undefined" && !(typeof req.body.completed == "boolean"))
        return {
            "location": "body",
            "param": "body.completed",
            "msg": "field 'completed' must be of type Boolean",
            "value": req.body
        };
};

export const checkDeleteTodoItemRequest = (req: Request) => {
    req.checkParams("id", "must include a valid mongo id in the request parameter").isMongoId();
    return (req.validationErrors()) ? req.validationErrors() : null;
};