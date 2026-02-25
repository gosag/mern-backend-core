import { IUser } from "../../models/UserModel.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
