import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

let contacts = [];

router.get("/", (ctx) => {
  // 列出完整通訊錄
  ctx.response.body = { contacts };
});

router.get("/:id", (ctx) => {
  // 顯示特定人的姓名和電話
  const id = ctx.params.id;
  const contact = contacts[id];
  
  if (contact) {
    ctx.response.body = contact;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Contact not found" };
  }
});

router.post("/", async (ctx) => {
  // 新增通訊錄
  const { name, phone } = await ctx.request.body().value;
  const newContact = { name, phone };
  contacts.push(newContact);
  
  ctx.response.body = { message: "Contact added successfully", contact: newContact };
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server started at: http://127.0.0.1:8000');
await app.listen({ port: 8000 });
