import { MigrationInterface, QueryRunner } from "typeorm"

export class updateColumnPlants1662828295870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Modify 'image' to 'images'

        //Remove decoration_location
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
