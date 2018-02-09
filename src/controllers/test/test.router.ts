import * as express from "express";
import * as testController from "./test.controller";

const router = express.Router();

// mount express paths, any addition middleware can be added as well.
router.get("", testController.getTest);

// Export the router
export = router;