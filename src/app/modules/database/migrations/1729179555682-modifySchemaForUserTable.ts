import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySchemaForUserTable1729179555682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            MODIFY first_name VARCHAR(255) NULL,
            MODIFY last_name VARCHAR(255) NULL,
            MODIFY email VARCHAR(255) NULL,
            MODIFY phone VARCHAR(255) NULL,
            MODIFY is_deleted VARCHAR(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            MODIFY first_name VARCHAR(255) NOT NULL,
            MODIFY last_name VARCHAR(255) NOT NULL,
            MODIFY email VARCHAR(255) NOT NULL,
            MODIFY phone VARCHAR(255) NOT NULL,
            MODIFY is_deleted VARCHAR(255) NOT NULL;
        `);
    }
}
