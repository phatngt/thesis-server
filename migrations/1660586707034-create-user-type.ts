import { MigrationInterface, QueryRunner, Table, TableColumn, TableExclusion, TableForeignKey } from "typeorm"

export class createUserType1660586707034 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_type",
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
                        name: "type",
                        type: "varchar"
                    },
                    {
                        name: "desc",
                        type: "text"
                    }
                ]
            })
        );

        //Add user_type column to user table
        await queryRunner.addColumn("user",
            new TableColumn({
                name: "user_type_id",
                type: "int"
            })
        );

        //Create foreignkey 1-1: User has one type
        await queryRunner.createForeignKey(
            "user",
            new TableForeignKey({
                columnNames: ["user_type_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user_type",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_type", true);
    }

}
