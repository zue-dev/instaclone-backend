import { Hashtag, Photo } from "@prisma/client";
import client from "../client";

export default {
  Photo: {
    user: ({ userId }: Photo) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }: Photo) =>
      client.hashtag.findMany({
        where: {
          photos: { some: { id } },
        },
      }),
    likes: ({ id }: { id: number }) =>
      client.like.count({ where: { photoId: id } }),
  },
  Hashtag: {
    photos: ({ id }: Hashtag, { page }: { page: number }) => {
      return client.hashtag
        .findUnique({
          where: { id },
        })
        .photos();
    },
    totalPhotos: ({ id }: Hashtag) =>
      client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      }),
  },
};
