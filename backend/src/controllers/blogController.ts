import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const postBlogHandler = (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("from handler");

  return c.json({ message: "Hello Blog" });
};

const editBlogHandler = (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("from handler");

  return c.json({ message: "Hello edit Blog" });
};

const getBlogByIdHandler = (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("from handler");

  return c.json({ message: "Hello get by id Blog" });
};

const getBlogBulkhandler = (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("from handler");

  return c.json({ message: "Hello get bulk Blog" });
};

export {
  postBlogHandler,
  getBlogByIdHandler,
  getBlogBulkhandler,
  editBlogHandler,
};
