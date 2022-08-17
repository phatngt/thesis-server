import { MigrationInterface, QueryRunner } from "typeorm"

export class insertValue1660756472929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('role')
            .values({
                name: "admin",
                desc: "This is the admin role"
            }).execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('role')
            .values({
                name: "user",
                desc: "This is the user role"
            }).execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('role')
            .where("name = :name", { name: "admin" })
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('role')
            .where("name = :name", { name: "user" })
            .execute()

    }

}
