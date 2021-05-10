import bcrypt from "bcrypt";
import client from "../../client";
import { CreateAccountParams } from "../../types/user";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, userName, email, password }: CreateAccountParams
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
