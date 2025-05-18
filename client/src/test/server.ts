import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

type HttpMethod = "get" | "post" | "put" | "delete";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

const server = setupServer();
const handlers = (method: HttpMethod, route: string, response: JsonValue) => {
  return http[method](route, () => HttpResponse.json(response));
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, handlers };
