import { MigrationInterface, QueryRunner } from "typeorm"

export class insertUserType1660759787523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('user_type')
            .values({
                name: "admin",
                desc: "This is the admin type"
            }).execute()
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('user_type')
            .values({
                name: "client",
                desc: "This is the client type"
            }).execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('user_type')
            .where("name = :name", { name: "admin" })
            .execute()
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from('user_type')
            .where("name = :name", { name: "client" })
            .execute()

    }

}
