import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { open, DB } from "https://deno.land/x/sqlite/mod.ts";

const app = new Application();
const router = new Router();

// 使用 SQLite 資料庫
const dbPath = "./contacts.db";
const db: DB = await open(dbPath);
await db.query(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT
  )
`);

router.get("/", async (ctx) => {
  // 列出完整通訊錄
  const result = await db.query("SELECT * FROM contacts");
  ctx.response.body = { contacts: result };
});

router.get("/:id", async (ctx) => {
  // 顯示特定人的姓名和電話
  const id = ctx.params.id;
  const result = await db.query("SELECT * FROM contacts WHERE id = ?", [id]);

  if (result.length > 0) {
    ctx.response.body = result[0];
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Contact not found" };
  }
});

router.post("/", async (ctx) => {
  // 新增通訊錄
  const { name, phone } = await ctx.request.body().value;
  await db.query("INSERT INTO contacts (name, phone) VALUES (?, ?)", [name, phone]);

  const newContact = { name, phone };
  ctx.response.body = { message: "Contact added successfully", contact: newContact };
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started at: http://127.0.0.1:8000`);
await app.listen({ port: 8000 });
