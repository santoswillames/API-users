import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/getUsers/mongoGetUsers";
import { GetUsersController } from "./controller/getUsers/getUsers";
import { MongoClient } from "./databse/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
