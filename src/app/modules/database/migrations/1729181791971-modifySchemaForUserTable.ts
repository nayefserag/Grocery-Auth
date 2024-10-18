import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySchemaForUserTable1729181791971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            MODIFY is_active BOOLEAN NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            MODIFY is_active BOOLEAN NULL;
        `);
    }

}
