import * as express from "express";
import * as todoController from "./todo.controller";

const router = express.Router();

// mount express paths, any addition middleware can be added as well.
router.get("/", todoController.getTodos);
router.post("/", todoController.postTodoItem);
router.get("/:id", todoController.getTodoItem);
router.put("/:id", todoController.putTodoItem);
router.delete("/:id", todoController.deleteTodoItem);
// router.use("/*", todoController.handleTodoError);

// Export the router
export = router;