import { Hono } from "hono";

//router imports
import { userRouter } from "./user";
import { blogRouter } from "./blog";

const rootRouter = new Hono();

rootRouter.route("/blog", blogRouter);
rootRouter.route("/user", userRouter);

export { rootRouter };
