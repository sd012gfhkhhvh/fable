import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const postBlogHandler = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content, published } = c.req.json();

  const authorId = c.get("userId");

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });

    await prisma.$disconnect(); // disconnect prisma client from server

    return c.json(
      { message: "Blog post created successfully", data: post },
      200
    );
  } catch (e: any) {
    console.log(e.message);
    await prisma.$disconnect();
    return c.json({ message: "Blog post cretion failed", error: e }, 403);
  }
};

const editBlogHandler = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { content } = c.req.json();
  const { blogId } = c.req.param;
  const authorId = c.get("userId");

  try {
    const editedBLog = await prisma.post.update({
      where: { id: blogId, authorId },
      data: { content },
    });

    await prisma.$disconnect();
    return c.json(
      { message: "Blog updated successfully", data: editedBLog },
      200
    );
  } catch (e: any) {
    console.log(e.message);
    prisma.$disconnect();
    return c.json({ message: "error editing", error: e }, 403);
  }
};

const getBlogByIdHandler = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { blogId } = c.req.param;
  const authorId = c.get("userId");

  try {
    const blog = await prisma.post.findUnique({
      where: { id: blogId },
    });

    await prisma.$disconnect();
    return c.json({ message: "Success", data: blog }, 200);
  } catch (e: any) {
    console.log(e.message);
    prisma.$disconnect();
    return c.json({ message: "error editing", error: e }, 403);
  }
};

const getBlogBulkhandler = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany({});

    await prisma.$disconnect();
    return c.json({ message: "Success", data: blog }, 200);
  } catch (e: any) {
    console.log(e.message);
    prisma.$disconnect();
    return c.json({ message: "error editing", error: e }, 403);
  }
};

export {
  postBlogHandler,
  getBlogByIdHandler,
  getBlogBulkhandler,
  editBlogHandler,
};
