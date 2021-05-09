import client from "../client";

interface SeeProfileParams {
  userName: string;
}

export default {
  Query: {
    seeProfile: (_: any, { userName }: SeeProfileParams) => {
      return client.user.findUnique({ where: { userName } });
    },
  },
};
