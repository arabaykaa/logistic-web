import { BASE_URL } from "../global-constants";

const baseApi = (url: string) => `${BASE_URL}${url}`;

type GetAllType = {
  page: string | number;
  limit: string | number;
};

export class Path {
  static Auth = class {
    static login = baseApi("auth/login");
  };
  static Containers = class {
    static create = baseApi("containers");
    static getAll = ({ limit, page }: GetAllType) =>
      baseApi(`containers/?page=${page}&limit=${limit}`);
    static getById = (id: string | number) => baseApi(`containers/user/${id}`);
    static update = (id: string | number) => baseApi(`containers/${id}`);
    static delete = (id: string | number) => baseApi(`containers/${id}`);
  };
}
