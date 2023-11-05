import { IGetUsersRepository } from "../../controller/getUsers/protocols";
import { MongoClient } from "../../databse/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongoProtocols";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
