const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

function queryStringify(data) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export default class HTTPTransport {
  get = (url, options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url, options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url, options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url, options = {}): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options = {},
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const {
      headers = {},
      method,
      data,
      credentials = "include",
      mode = "cors",
    } = options;

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

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

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
        // Проверяем, является ли data объектом FormData
        if (data instanceof FormData) {
          console.log("formData");
          xhr.send(data); // Отправляем FormData напрямую, Content-Type установится автоматически
        } else {
          // Для остальных данных (например, JSON) устанавливаем Content-Type и преобразуем в JSON
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}
