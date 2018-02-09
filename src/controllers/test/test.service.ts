
import * as bluebird from "bluebird";
import { ABError } from "../../models/ABError";

let switcher = 0;
export let testFunction = (): Promise<number> => {
    switcher = (switcher < 3) ? switcher + 1 : 0;

    return new Promise(function (resolve, reject) {
        if (switcher == 0)
            resolve(42);
        else if (switcher == 1)
            reject(new ABError({
                message: "bad request error",
                status: 400
            }));
        else if (switcher == 2)
            reject(new ABError({
                message: "server error",
                status: 500
            }));
        else
            reject("string error message");
    });
};
