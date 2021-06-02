import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { LoginParams, LoginResult } from "../../types/user";

export default {
  Mutation: {
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

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY!);

      return {
        ok: true,
        token,
      };
    },
  },
};
