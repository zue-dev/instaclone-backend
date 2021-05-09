import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateAccountParams, LoginParams, LoginResult } from "../types/user";

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
    login: async (
      _: any,
      { userName, password }: LoginParams
    ): Promise<LoginResult> => {
      /**
       * find user with args.userName
       * check password with args.password
       * issue a token and send it to the user
       */
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: "user not found",
        };
      }

      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        return {
          ok: false,
          error: "incorrect password",
        };
      }

      const token = await jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY as string
      );

      return {
        ok: true,
        token,
      };
    },
  },
};
