
import { ABError } from "../../models/ABError";
export let handleTodoError = (err: any, message?: string, status?: number): ABError => {
    return new ABError({
        message : (message) ? message : null,
        status : (status) ? status : 500,
        error : err
    });
};