import { Hono } from "hono";

//router imports
import { userRouter } from "./user";
import { blogRouter } from "./blog";

type Bindings = {
  DATABASE_URL: string;
};

const rootRouter = new Hono<{ Bindings: Bindings }>();

rootRouter.route("/blog", blogRouter);
rootRouter.route("/user", userRouter);

export { rootRouter };
