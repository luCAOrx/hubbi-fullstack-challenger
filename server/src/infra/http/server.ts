import { randomUUID } from "node:crypto";

import { User } from "@domain/entities/user";

const user = User.create({
  email: "test@example.com",
  name: "User Test",
});

console.log({ user: { id: randomUUID(), props: user.props } });
