import client from "../../client";
import bcrypt from "bcrypt";
import { EditProfileParams, EditProfileResult } from "../../types/user";

export default {
  Mutation: {
    editProfile: async (
      _: any,
      {
        firstName,
        lastName,
        userName,
        email,
        password: newPassword,
      }: EditProfileParams
    ): Promise<EditProfileResult> => {
      let uglyPassword = undefined;

      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: 1 },
        data: {
          firstName,
          lastName,
          userName,
          email,
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
    },
  },
};
