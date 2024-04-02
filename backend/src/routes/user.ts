import { Hono } from "hono";

//userController
import { signinHandler, signupHandler } from "../controllers/userController";

const userRouter = new Hono();

userRouter
  .post("/signup", signupHandler)

  .post("/signin", signinHandler);

export { userRouter };
