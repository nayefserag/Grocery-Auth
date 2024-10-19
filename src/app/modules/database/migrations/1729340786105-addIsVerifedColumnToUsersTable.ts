import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsVerifedColumnToUsersTable1729340786105 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            ADD COLUMN is_verified BOOLEAN DEFAULT false;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            DROP COLUMN is_verified;
        `);
    }


}
