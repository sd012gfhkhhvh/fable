import { Hono } from "hono";

import {
  editBlogHandler,
  getBlogBulkhandler,
  getBlogByIdHandler,
  postBlogHandler,
} from "../controllers/blogController";
import { userAuth } from "../middlewares/userAuth";

type Bindings = {
  DATABASE_URL: string;
};

const blogRouter = new Hono<{ Bindings: Bindings }>();

blogRouter
  //unprotected routes
  .get("/bulk", getBlogBulkhandler)

  //auth middleware
  .use(userAuth)
  //protected routes
  .post("/", postBlogHandler)

  .put("/", editBlogHandler)

  .get("/:id", getBlogByIdHandler);

export { blogRouter };
