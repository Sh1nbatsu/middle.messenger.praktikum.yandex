import { expect } from "chai";

import sinon from "sinon";

import HTTPTransport from "./httpTransport";

describe("HTTPTransport", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Transport should call get request with correct params", async () => {
    const http = new HTTPTransport();
    const requestStub = sinon
      .stub(http, "request" as keyof HTTPTransport)
      .resolves();

    const baseUrl = "/api/test";
    await http.get(baseUrl, { data: { a: "1", b: "2 2" } });

    const expectedUrl = `${baseUrl}?a=1&b=2%202`;

    expect(requestStub.args[0][0]).to.equal(expectedUrl);
    expect(requestStub.args[0][1]).to.deep.equal({ method: "GET" });
  });

  it("Transport should call post request with correct params", async () => {
    const http = new HTTPTransport();
    const requestStub = sinon
      .stub(http, "request" as keyof HTTPTransport)
      .resolves();

    const baseUrl = "/api/test";
    await http.post(baseUrl);

    const expectedUrl = `${baseUrl}`;

    expect(requestStub.args[0][0]).to.equal(expectedUrl);
    expect(requestStub.args[0][1]).to.deep.equal({ method: "POST" });
  });

  it("Transport should call put request with correct params", async () => {
    const http = new HTTPTransport();
    const requestStub = sinon
      .stub(http, "request" as keyof HTTPTransport)
      .resolves();

    const baseUrl = "/api/test";
    await http.put(baseUrl);

    const expectedUrl = `${baseUrl}`;

    expect(requestStub.args[0][0]).to.equal(expectedUrl);
    expect(requestStub.args[0][1]).to.deep.equal({ method: "PUT" });
  });

  it("Transport should call delete request with correct params", async () => {
    const http = new HTTPTransport();
    const requestStub = sinon
      .stub(http, "request" as keyof HTTPTransport)
      .resolves();

    const baseUrl = "/api/test";
    await http.delete(baseUrl);

    const expectedUrl = `${baseUrl}`;

    expect(requestStub.args[0][0]).to.equal(expectedUrl);
    expect(requestStub.args[0][1]).to.deep.equal({ method: "DELETE" });
  });
});
