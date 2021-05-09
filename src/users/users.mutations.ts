import client from "../client";
import bcrypt from "bcrypt";

interface UserModel {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, userName, email, password }: UserModel
    ) => {
      /**
       * check if username or email are already on DB
       * hash password
       * save and return the user
       */
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });

        if (existingUser) {
          throw new Error("This userName || email is already taken.");
        }

        const uglyPassword = await bcrypt.hash(password, 10);

        const successNewUser = client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword,
          },
        });

        return successNewUser;
      } catch (e) {
        return e;
      }
    },
  },
};
