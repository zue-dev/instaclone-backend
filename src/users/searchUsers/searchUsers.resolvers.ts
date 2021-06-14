import client from "../../client";

export default {
  Query: {
    searchUsers: async (_: any, { keyword }: { keyword: string }) => {
      return client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
    },
  },
};
