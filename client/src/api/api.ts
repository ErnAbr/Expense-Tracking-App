import axios, { AxiosResponse } from "axios";
import {
  LoginData,
  RegisterData,
  UserValidationServerResposne,
} from "../interfaces/userAuth";
import {
  CategoryDeleteData,
  CategoryObject,
  CategoryPutData,
} from "../interfaces/category";
import { CategoryAddData } from "../components/Forms/CategoryForm/AddCategoryForm";
import { ExpenseAddData } from "../interfaces/expense";


axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

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
  AddUserCatOrSub: (body: CategoryAddData) =>
    requests.post<string>("/category/AddUserCategory", body),
  updateUserCatOrSub: (body: CategoryPutData) =>
    requests.put<string>("/category/UpdateUserCategory", body),
  deleteUserCatOrSub: (body: CategoryDeleteData) =>
    requests.delete<string>("/category/DeleteUserCategory", body),
};

const Expense = {
  AddUserExpense: (body: ExpenseAddData) =>
    requests.post<string>("/Expense/AddUserExpense", body),
};

const Test = {
  allUSers: () => requests.get("/user/auth/"),
  allUSersPost: () => requests.post("/user/auth/", {}),
};

export const api = {
  User,
  Category,
  Expense,
  Test,
};
