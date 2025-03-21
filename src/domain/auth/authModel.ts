import HTTPTransport from "../../core/httpTransport";

const authApi = new HTTPTransport();

export default class Auth {
  async login(data): Promise<XMLHttpRequest> {
    return authApi.post("https://ya-praktikum.tech/api/v2/auth/signin", {
      data,
    });
  }

  async signup(data): Promise<XMLHttpRequest> {
    return authApi.post("https://ya-praktikum.tech/api/v2/auth/signup", {
      data,
    });
  }

  async profile(): Promise<XMLHttpRequest> {
    return authApi.get("https://ya-praktikum.tech/api/v2/auth/user");
  }

  async logout(): Promise<XMLHttpRequest> {
    return authApi.post("https://ya-praktikum.tech/api/v2/auth/logout");
  }
}
