import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../controller/deleteUsers/protocols";
import { MongoClient } from "../../databse/mongo";
import { User } from "../../models/user";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (deletedCount === 0) {
      throw new Error("User not deleted.");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
