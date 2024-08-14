import { expect as _expect } from "chai";
import HttpEase from "../src/http-ease.js";

const expect = _expect;

describe("HttpEase TESTS", () => {
  const ease = new HttpEase("https://jsonplaceholder.typicode.com");

  it("should GET data from the API", async () => {
    const data = await ease.get("/posts/1");
    console.log("GET Response:", data);
    expect(data).to.have.property("id").that.equals(1);
  });

  it("should POST data to the API", async () => {
    const newPost = { title: "kaleb", body: "kaleb-alebachew", userId: 1 };
    const data = await ease.post("/posts", newPost);
    console.log("POST Response:", data);
    expect(data).to.have.property("id");
  });

  it("should PUT data to the API", async () => {
    const updatedPost = {
      id: 1,
      title: "updated-kaleb",
      body: "updated-kaleb-alebachew",
      userId: 1,
    };
    const data = await ease.put("/posts/1", updatedPost);
    console.log("PUT Response:", data);
    expect(data).to.have.property("id").that.equals(1);
  });

  it("should DELETE data from the API", async () => {
    const response = await ease.delete("/posts/1");
    console.log("DELETE Response:", response);
    expect(response).to.be.empty;
  });
});
