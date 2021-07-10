import client from "../../client";

export default {
  Query: {
    searchPhotos: (_: any, { keyword }: { keyword: string }) =>
      client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
      }),
  },
};
