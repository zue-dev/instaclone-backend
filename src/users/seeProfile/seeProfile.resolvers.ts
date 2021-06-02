import { Resolvers } from "../../type";

interface SeeProfileParams {
  userName: string;
}

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { userName }, { client }) => {
      return client.user.findUnique({ where: { userName } });
    },
  },
};

export default resolvers;
