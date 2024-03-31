import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Although DATABASE_URL(secret) is not mentioned in the wrangler.toml file as a variable 
// but it is stored inside the .dev.vars file which is added to the worker(npx wrangler secret put DATABASE_URL)
// ref(Secrets) - https://developers.cloudflare.com/workers/configuration/secrets/#secrets-in-development
type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  console.log(c.env.DATABASE_URL);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Hello Hono!");
});

export default app;
