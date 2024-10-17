import { Module } from "@nestjs/common";
import { AuthRepository } from "../infrastructure/repositories/auth/auth.repository";
import { AuthModule } from "../api/auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class ApplicationModule { }