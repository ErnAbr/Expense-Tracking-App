import axios, { AxiosError, AxiosResponse } from "axios";
import {
  LoginData,
  RegisterData,
  UserValidationServerResposne,
} from "../interfaces/userAuth";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// axios.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           console.log(error.response.data);
//           break;
//         default:
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

const responseBody = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
};

const User = {
  login: (body: LoginData) => requests.post<string>("/user/auth/login", body),
  register: (body: RegisterData) =>
    requests.post<string>("/user/auth/register", body),
  getCurrentUser: () => requests.get<UserValidationServerResposne>("/user/auth/me"),
};

const Test = {
  allUSers: () => requests.get("/user/auth/"),
  allUSersPost: () => requests.post("/user/auth/", {}),
};

export const api = {
  User,
  Test,
};
