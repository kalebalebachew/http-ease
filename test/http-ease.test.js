import { expect as _expect } from "chai";
import HttpEase from "../src/http-ease.js";

const expect = _expect;

describe("HttpEase", () => {
  const httpClient = new HttpEase("https://jsonplaceholder.typicode.com");

  it("should GET data from the API", async () => {
    const data = await httpClient.get("/posts/1");
    expect(data).to.have.property("id").that.equals(1);
  });

  it("should POST data to the API", async () => {
    const newPost = { title: "foo", body: "bar", userId: 1 };
    const data = await httpClient.post("/posts", newPost);
    console.log("POST Response:", data);
    expect(data).to.have.property("id");
  });

  it("should PUT data to the API", async () => {
    const updatedPost = { id: 1, title: "foo", body: "baz", userId: 1 };
    const data = await httpClient.put("/posts/1", updatedPost);
    console.log("PUT Response:", data);
    expect(data).to.have.property("id").that.equals(1);
  });

  it("should DELETE data from the API", async () => {
    const response = await httpClient.delete("/posts/1");
    expect(response).to.be.empty;
  });
});
