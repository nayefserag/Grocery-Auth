import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsCompletedToUserTable1729178691817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN is_completed varchar(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN is_completed;
        `);
    }

}
