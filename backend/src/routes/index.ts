import { Hono } from "hono";

//router imports
import { userRouter } from "./user";
import { blogRouter } from "./blog";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: number;
};

const rootRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

rootRouter.route("/blog", blogRouter);
rootRouter.route("/user", userRouter);

export { rootRouter };
