import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
    <html>
      <body>
      </body>
    </html>`;
});

router.get("/nqu/", (ctx) => {
  ctx.response.body = `
    <html>
      <body>
        <a href="https://www.nqu.edu.tw/">NQU</a>
      </body>
    </html>`;
});

router.get("/nqu/csie/", (ctx) => {
  ctx.response.body = `
    <html>
      <body>
        <a href="https://csie.nqu.edu.tw/">NQU_CSIE</a>
      </body>
    </html>`;
});

router.get("/to/nqu/", (ctx) => {
  ctx.response.redirect("https://www.nqu.edu.tw/");
});

router.get("/to/nqu/csie/", (ctx) => {
  ctx.response.redirect("https://csie.nqu.edu.tw/");
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server started at: http://127.0.0.1:8000');
await app.listen({ port: 8000 });
