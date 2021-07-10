import { User } from ".prisma/client";
import client from "../client";

export default {
  User: {
    totalFollowers: ({ id }: User) => {
      return client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      });
    },
    totalFollowing: ({ id }: User) => {
      return client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      });
    },
    isMe: ({ id }: User, _: any, { loggedInUser }: { loggedInUser: User }) => {
      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    },
    isFollowing: async (
      { id }: User,
      _: any,
      { loggedInUser }: { loggedInUser: User }
    ) => {
      if (!loggedInUser) {
        return false;
      }

      const exists = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          following: {
            some: { id },
          },
        },
      });

      return Boolean(exists);
    },
    photos: ({ id }: { id: number }) => {
      client.user.findUnique({ where: { id } }).photos();
    },
  },
};
