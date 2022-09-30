import { Column } from 'typeorm';

export abstract class Audit {
  @Column({ name: "is_deleted", type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: "update_at", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Column({ name: "create_at", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
