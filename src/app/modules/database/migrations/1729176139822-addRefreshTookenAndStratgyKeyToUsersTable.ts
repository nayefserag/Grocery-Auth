import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenAndStrategyKeyToUsersTable1729176139822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN strategy_key varchar(255) NULL,
            ADD COLUMN refresh_token varchar(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN strategy_key,
            DROP COLUMN refresh_token;
        `);
    }
}
