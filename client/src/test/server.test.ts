// tests.ts
import { server, handlers } from "./server";

it("works", async () => {
  server.use(handlers("get", "/user/auth/", { message: "Hey!" }));

  const res = await fetch("/user/auth/");
  const data = await res.json();

  expect(data.message).toBe("Hey!");
});

it("works2", async () => {
  server.use(handlers("post", "/user/auth/", { message: "Hey!" }));

  const res = await fetch("/user/auth/", { method: "POST" });
  const data = await res.json();

  expect(data.message).toBe("Hey!");
});
