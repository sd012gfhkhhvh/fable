import { Hono } from "hono";

//userController
import { signinHandler, signupHandler } from "../controllers/userController";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter
  .post("/signup", signupHandler)

  .post("/signin", signinHandler);

export { userRouter };
