import { User } from ".prisma/client";

export interface IContext {
  loggedInUser?: User;
  protectResolver: () => void;
}
