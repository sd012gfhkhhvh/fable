import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type Bindings = {
  DATABASE_URL: string;
};

const blogRouter = new Hono<{ Bindings: Bindings }>();

blogRouter
  .post("/", (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("Hello blog!");
  })

  .put("/", (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("Hello Hono!");
  })

  .get("/bulk", (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("bulk data!");
  })

  .get("/:id", (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return c.text("Hello Hono!");
  });

export { blogRouter };
