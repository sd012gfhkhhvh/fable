import { Hono } from "hono";

//router imports
import { userRouter } from "./user";
import { blogRouter } from "./blog";

//middlewares
import { getPrismaClient } from "../middlewares/prismaClient";

type Env = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: number;
  };
};

const rootRouter = new Hono<Env>();

//initiate prisma-client middleware
rootRouter.use("/*", getPrismaClient);

// routes
rootRouter.route("/blog", blogRouter);
rootRouter.route("/user", userRouter);

export { rootRouter };
