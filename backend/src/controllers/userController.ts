import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const isUserExist = async (c: any, prisma: any, email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) return false;

  return true;
};

const signupHandler = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { name, email, password } = await c.req.json();
  console.log(name, email, password);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    console.log(user);

    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);

    await prisma.$disconnect(); // disconnect prisma client

    return c.json(
      { message: "user created successfully", token: jwtToken },
      200
    );
  } catch (e: any) {
    console.log(e.message);

    await prisma.$disconnect();
    return c.json({ message: "email already exist", error: e }, 403);
  }
};

const signinHandler = async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email, password },
    });

    if (user === null) {
      return c.json(
        {
          message: "not a valid email or password",
        },
        411
      );
    }

    //sign the jwt token
    const token = await sign({ id: user?.id }, c.env.JWT_SECRET);

    await prisma.$disconnect(); // disconnect prisma client

    return c.json({ message: "user signed in successfully", token }, 200);
  } catch (e) {
    console.log(e);

    await prisma.$disconnect();
    return c.json({ message: "Error signing user", error: e }, 403);
  }
};

export { signupHandler, signinHandler };
