import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createUserTable1660410964201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'role',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        isUnique: true,
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "desc",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role')
    }

}
