import { User } from "src/models";

export interface AppRequest extends Request {
  id: string;
  user: User
}
