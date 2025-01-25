import { deepStrictEqual } from "node:assert";
import { randomUUID } from "node:crypto";
import { describe, it } from "node:test";

import { User } from "./user";

describe("Test example", () => {
  it("should be return a user object", () => {
    const user = User.create({
      name: "User Test",
      email: "test@example.com",
    });

    deepStrictEqual(user.props, {
      name: "User Test",
      email: "test@example.com",
    });
  });
});
console.log(randomUUID());
