import { Hono } from "hono";

import {
  editBlogHandler,
  getBlogBulkhandler,
  getBlogByIdHandler,
  postBlogHandler,
} from "../controllers/blogController";

import { userAuth } from "../middlewares/userAuth";

const blogRouter = new Hono();

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
