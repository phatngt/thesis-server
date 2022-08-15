import { MigrationInterface, QueryRunner, Table, TableExclusion, TableForeignKey, TableIndex } from "typeorm"

export class createRoleTable1660501295721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        isUnique: true,

                    },
                    {
                        name: "lname",
                        type: "varchar"
                    },
                    {
                        name: "fname",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "birthday",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "is_premium",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "role_id",
                        type: "int",
                    }
                ]
            })
        );
        // Create index
        await queryRunner.createIndex(
            "user",
            new TableIndex({
                name: "IDX_USER_EMAIL",
                columnNames: ["email"]
            })
        )

        // ForeignKey
        await queryRunner.createForeignKey(
            "user",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "role",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
