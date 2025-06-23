import { BASE_URL } from "../global-constants";

const baseApi = (url: string) => `${BASE_URL}${url}`;

export class Path {
  static Auth = class {
    static login = baseApi("auth/login");
  };
  static Containers = class {
    static create = baseApi("containers");
    static getAll = baseApi("containers");
    static update = (id: string | number) => baseApi(`containers/${id}`);
    static delete = (id: string | number) => baseApi(`containers/${id}`);
  };
}
