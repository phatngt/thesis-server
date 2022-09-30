import { User } from "src/models";
import * as GardenRoomType from "./garden";
export interface AppRequest extends Request {
  id: string;
  user: User;
}
