import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class creatPlantType1660980777617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "plant_type",
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
                        name: "name",
                        type: "text"
                    },
                    {
                        name: "description",
                        type: "text"
                    },
                    {
                        name: "family",
                        type: "varchar"
                    },
                    {
                        name: "genus",
                        type: "varchar"
                    },
                    {
                        name: "species",
                        type: "varchar"
                    },
                    {
                        name: "light",
                        type: "enum",
                        enum: ['HIGH', 'MEDIUM', 'LOW'],
                        isNullable: true
                    },
                    {
                        name: "is_deleted",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "add_by",
                        type: "int",
                        isNullable: true

                    },
                    {
                        name: "add_on",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "upd_by",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "upd_on",
                        type: "timestamp",
                        isNullable: true
                    },
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("plant_type")
    }

}
