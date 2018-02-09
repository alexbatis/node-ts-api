import { Request, Response, NextFunction } from "express";
import * as testService from "./test.service";
import { ABError } from "../../models/ABError";
/**
 * GET /test
 * test api endpoint
 */

 export let getTest = (req: Request, res: Response, next: NextFunction) => {
    const num = testService.testFunction()
        .then(result => {
            return res.send({ foo: result });
        }, err => {
            return res.send(err);
        });
};

export let handleError = (req: Request, res: Response) => {
    const passedError = res.locals.err;
    if (passedError instanceof ABError)
        return res.status(passedError.status).send(res.locals.err);
    else
        return res.status(500).send("There was an error");
};
