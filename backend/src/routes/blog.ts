import { Hono } from "hono";

import {
  editBlogHandler,
  getBlogBulkhandler,
  getBlogByIdHandler,
  postBlogHandler,
} from "../controllers/blogController";

import { userAuth } from "../middlewares/userAuth";
import { getPrismaClient } from "../middlewares/prismaClient";

const blogRouter = new Hono();

blogRouter
  // .use(getPrismaClient)
  //unprotected routes
  .get("/bulk", getBlogBulkhandler)

  //auth middleware
  .use(userAuth)
  //protected routes
  .post("/", postBlogHandler)

  .put("/:blogId", editBlogHandler)

  .get("/:id", getBlogByIdHandler);

export { blogRouter };
