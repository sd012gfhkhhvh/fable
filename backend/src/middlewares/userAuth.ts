import { verify } from "hono/jwt";


const userAuth = async (c: any, next: any) => {
  //auth
  console.log("auth middleware passed");
  const authorization = c.req.header("authorization");

  if (!authorization || authorization.startsWith("Bearer ")) {
    return c.json({ message: "Not a valid token" }, 403);
  }

  try {
    const token = authorization.split(" ")[1];
    const decodedValue = await verify(token, c.env.JWT_SECRET);

    c.set("userId", decodedValue.id);
    await next();
  } catch (err: any) {
    console.log(err.message);
    c.json({ message: "Not a valid token", error: err }, 403);
  }
};

export { userAuth };
