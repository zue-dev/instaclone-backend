import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObject = [];

        if (caption) {
          hashtagObject = processHashtags(caption);
        }

        // save the photo with the parsed hashtags
        // add the photo to the hashtags
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: { id: loggedInUser?.id },
            },
            ...(hashtagObject.length > 0 && {
              hashtags: { connectOrCreate: hashtagObject },
            }),
          },
        });
      }
    ),
  },
};
