import { app } from "./app";

app.listen(process.env.PORT ?? process.env.SERVER_PORT, () => {
  console.log(
    `Server running in port: ${process.env.PORT ?? process.env.SERVER_PORT}`,
  );
});
