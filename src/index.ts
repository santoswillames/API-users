import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/getUsers/mongoGetUsers";
import { GetUsersController } from "./controller/getUsers/getUsers";
import { MongoClient } from "./databse/mongo";
import { MongoCreateUserRepository } from "./repositories/createUsers/mongoCreateUsers";
import { CreateUserController } from "./controller/createUsers/createUsers";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.use(express.json());

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );
    const { statusCode, body } = await createUserController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
