import { User } from "src/models";
import * as GardenRoomType from "./garden-room";
export interface AppRequest extends Request {
  id: string;
  user: User
}
