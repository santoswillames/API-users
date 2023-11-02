import { IGetUsersRepository } from "../../controller/getUsers/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "will",
        lastName: "santos",
        email: "will@teste.com",
        password: "123",
      },
    ];
  }
}
