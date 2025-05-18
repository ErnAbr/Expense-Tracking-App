// tests.ts
import { server, handlers } from "./server";

test("works with get", async () => {
  server.use(handlers("get", "/user/auth/", { message: "Hey!" }));

  const res = await fetch("/user/auth/");
  const data = await res.json();

  expect(data.message).toBe("Hey!");
});

test("works with post", async () => {
  server.use(handlers("post", "/user/auth/", { message: "Hey!" }));

  const res = await fetch("/user/auth/", { method: "POST" });
  const data = await res.json();

  expect(data.message).toBe("Hey!");
});
