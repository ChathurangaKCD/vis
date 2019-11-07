import * as _Requests_ from "./requests";
import { IGNORE_REQUEST_ERRORS } from "./constants";

const handler: ProxyHandler<typeof Requests> = {
  get: function(target: any, prop: string, receiver) {
    const fn = target[prop];
    if (prop === "getData") return fn;
    // On POST/PUT/DELETE
    return async (...args: any[]) => {
      try {
        // handle async error
        return await fn(...args);
      } catch (error) {
        console.log("Network Error/ Server Error occured -> Ignored");
        return true; // hide server errors
      }
    };
  }
};

const serviceProxy: typeof _Requests_ = new Proxy(_Requests_, handler);

export const Requests = IGNORE_REQUEST_ERRORS ? serviceProxy : _Requests_;
