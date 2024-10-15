import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AuthRepository } from "../infrastructure/repositories/auth/auth.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [AuthModule,AuthRepository],
    exports: [],
})
export class ApiModule {}