import * as express from "express";
import { Request, Response, NextFunction } from "express";

// import sub-routers
import * as testRouter from "./controllers/test/test.router";
import * as todoRouter from "./controllers/todo/todo.router";

const router = express.Router();

// mount express paths, any addition middleware can be added as well.
// ex. router.use('/pathway', middleware_function, sub-router);
router.use("/test", testRouter);
router.use("/todos", todoRouter);

// Export the router
export = router;