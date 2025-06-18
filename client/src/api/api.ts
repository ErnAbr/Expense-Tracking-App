import axios, { AxiosError, AxiosResponse } from "axios";
import {
  LoginData,
  RegisterData,
  UserValidationServerResposne,
} from "../interfaces/userAuth";
import { CategoryDeleteData, CategoryObject } from "../interfaces/category";
// import { useNavigate } from "react-router-dom";
// import { routes } from "../navigation/routes/routes";
// import { useStore } from "zustand";
// import { useAppContext } from "../context/appContext";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// axios.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           () => {
//             const navigate = useNavigate();
//             const { setUser } = useStore(useAppContext);
//             setUser(null);
//             navigate(routes.HOME);
//           };
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
  delete: <T>(url: string, body: object) =>
    axios.delete<T>(url, { data: body }).then(responseBody),
};

const User = {
  register: (body: RegisterData) =>
    requests.post<string>("/user/auth/register", body),
  login: (body: LoginData) => requests.post<string>("/user/auth/login", body),
  logout: () => requests.post<string>("/user/auth/logout", {}),
  getCurrentUser: () =>
    requests.get<UserValidationServerResposne>("/user/auth/me"),
};

const Category = {
  getAllUserCategories: () =>
    requests.get<CategoryObject[]>("/category/getAllCategories"),
  deleteUserCatOrSub: (body: CategoryDeleteData) =>
    requests.delete<string>("/category/DeleteCatOrSub", body),
};

const Test = {
  allUSers: () => requests.get("/user/auth/"),
  allUSersPost: () => requests.post("/user/auth/", {}),
};

export const api = {
  User,
  Category,
  Test,
};
