import jwt from "jsonwebtoken";
import client from "../client";
import { User } from ".prisma/client";
import { IToken } from "../types/auth";
import { Context, Resolver } from "../type";

export const getUser = async (token: string): Promise<User | null> => {
  try {
    if (!token) {
      return null;
    }

    const verifiedToken = (await jwt.verify(
      token,
      process.env.SECRET_KEY!
    )) as IToken;

    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });

      if (user) {
        return user;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export function protectedResolver(ourResolver: Resolver) {
  return function (root: any, args: any, context: Context, info: any) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "please log in to perform this action",
      };
    }

    return ourResolver(root, args, context, info);
  };
}
