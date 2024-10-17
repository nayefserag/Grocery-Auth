import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySchemaForUserTable1729179784097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            MODIFY password VARCHAR(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            MODIFY password VARCHAR(255) NOT NULL;
        `);
    }


}
