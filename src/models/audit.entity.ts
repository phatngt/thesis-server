import { Column } from 'typeorm';

export abstract class Audit {
  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'int', nullable: true })
  add_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  add_on: Date;

  @Column({ type: 'int', nullable: true })
  upd_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  upd_on: Date;
}
