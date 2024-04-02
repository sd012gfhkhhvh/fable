import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const getPrismaClient = async (c: any, next: any) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    c.set("prisma", prisma);
    await next();
  } catch (e) {
    return c.json({ message: "Error creating client" }, 403);
  }
};

export { getPrismaClient };
