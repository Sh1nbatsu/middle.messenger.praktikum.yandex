const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

interface Options {
  headers?: Record<string, string> | Headers;
  method?: string;
  data?: Record<string, unknown> | unknown;
  credentials?: "omit" | "same-origin" | "include";
  mode?: "cors" | "no-cors" | "same-origin";
  timeout?: number;
}

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export default class HTTPTransport {
  get = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: Options = {},
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, credentials = "include" } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      if (credentials === "include") {
        xhr.withCredentials = true;
      }

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data as Record<string, unknown>)}` : url);

      if (headers instanceof Headers) {
        headers.forEach((value, key) => {
          xhr.setRequestHeader(key, value);
        });
      } else {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      console.log(data);
      console.log(data instanceof FormData);

      if (isGet || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          console.log("FormData");
          xhr.send(data);
        } else {

          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}
