import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOtpAndExpiryDateToUsersTable1729340456197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            ADD COLUMN otp VARCHAR(6),
            ADD COLUMN expiry_date TIMESTAMP;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users 
            DROP COLUMN otp,
            DROP COLUMN expiry_date;
        `);
    }

}
