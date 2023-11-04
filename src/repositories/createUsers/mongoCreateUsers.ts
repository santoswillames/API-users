import {
  CreateUserParams,
  ICreateUsersRepository,
} from "../../controller/createUsers/protocols";
import { MongoClient } from "../../databse/mongo";
import { User } from "../../models/user";

export class MongoCreateUserRepository implements ICreateUsersRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
