import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/getUsers/mongoGetUsers";
import { GetUsersController } from "./controller/getUsers/getUsers";
import { MongoClient } from "./databse/mongo";
import { MongoCreateUserRepository } from "./repositories/createUsers/mongoCreateUsers";
import { CreateUserController } from "./controller/createUsers/createUsers";
import { MongoUpdateUserRepository } from "./repositories/updateUsers/mongoUpdateUsers";
import { UpdateUserController } from "./controller/updateUsers/updateUsers";
import { MongoDeleteUserRepository } from "./repositories/deleteUsers/mongoDeleteUsers";
import { DeleteUserController } from "./controller/deleteUsers/deleteUsers";

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

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { statusCode, body } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { statusCode, body } = await deleteUserController.handle({
      params: req.params,
    });
    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
