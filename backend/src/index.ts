import { Hono } from "hono";
import { cors } from "hono/cors";
import { rootRouter } from "./routes";

// Although DATABASE_URL(secret) is not mentioned in the wrangler.toml file as a variable
// but it is stored inside the .dev.vars file which is added to the worker(npx wrangler secret put DATABASE_URL)
// ref(Secrets) - https://developers.cloudflare.com/workers/configuration/secrets/#secrets-in-development

const app = new Hono();

app.use(cors())

//routes
app.route("/api/v1", rootRouter);

// handle undefined routes
app.all("*", (c) => {
  return c.json({message: "Route not found"});
});

//error handling middleware
app.onError((err, c) => {
  return c.json({message:"server broke", error: err}, 500);
})

export default app;
