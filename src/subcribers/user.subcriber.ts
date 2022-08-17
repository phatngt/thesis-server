import { User } from "src/models";
import { sha512 } from "src/helpers";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

@EventSubscriber()
export class UserSubcriber implements EntitySubscriberInterface<User>{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): void | Promise<any> {
    if (event.entity.password) {
      event.entity.password = sha512(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<User>): void | Promise<any> {
    if (event.entity.password) {
      event.entity.password = sha512(event.entity.password);
    }
  }
}
