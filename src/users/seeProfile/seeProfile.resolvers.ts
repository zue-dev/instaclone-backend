import { Resolvers } from "../../type";

interface SeeProfileParams {
  userName: string;
}

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { userName }, { client }) => {
      return client.user.findUnique({
        where: { userName },
        include: {
          following: true,
          followers: true,
        },
      });
    },
  },
};

export default resolvers;
