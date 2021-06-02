import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { EditProfileParams, EditProfileResult } from "../../types/user";
import { protectedResolver } from "../users.utils";

interface AvatarModel {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => void;
}

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _: any,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        }: EditProfileParams,
        { loggedInUser }
      ): Promise<EditProfileResult> => {
        const { filename, createReadStream }: any = await avatar;
        const readStream = createReadStream();
        const writeStream = createWriteStream(
          process.cwd() + "/uploads/" + filename
        );
        readStream.pipe(writeStream);

        let uglyPassword = undefined;

        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser?.id },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile",
          };
        }
      }
    ),
  },
};
