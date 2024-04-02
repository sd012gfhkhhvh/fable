// create a new blog
const postBlogHandler = async (c: any) => {
  const prisma = c.get("prisma");
  const authorId = c.get("userId");

  const { title, content, published } = c.req.json();

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

// edit blog post
const editBlogHandler = async (c: any) => {
  const prisma = c.get("prisma");
  const authorId = c.get("userId");

  const { title, content, id } = c.req.json();

  try {
    const editedBLog = await prisma.post.update({
      where: {
        id,
        authorId,
      },
      data: {
        title,
        content,
      },
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

//get blog by id
const getBlogByIdHandler = async (c: any) => {
  const prisma = c.get("prisma");

  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findUnique({
      where: { id },
    });

    await prisma.$disconnect();
    return c.json({ message: "Success", data: blog }, 200);
  } catch (e: any) {
    console.log(e.message);
    prisma.$disconnect();
    return c.json({ message: "error editing", error: e }, 403);
  }
};

//get bulk blogs
const getBlogBulkhandler = async (c: any) => {
  const prisma = c.get("prisma");

  try {
    const blogs = await prisma.post.findMany({});

    await prisma.$disconnect();
    return c.json({ message: "Success", data: blogs }, 200);
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
