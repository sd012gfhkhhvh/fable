import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type Bindings = {
  DATABASE_URL: string;
};

const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter
  .post("/signup", (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("Hello signup!");
  })

  .post("/signin", (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("Hello signin!");
  });

export { userRouter };
