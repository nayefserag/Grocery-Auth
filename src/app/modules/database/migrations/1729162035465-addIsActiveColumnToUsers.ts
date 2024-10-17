import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveColumnToUsers1729162035465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN is_active BOOLEAN DEFAULT true;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN is_active;
        `);
    }

}
