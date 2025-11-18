import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './modules/health/health.controller';
import { DataController } from './modules/data/data.controller';
import { DataService } from './modules/data/data.service';
import { HttpModule } from './modules/http/http.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TerminusModule,
        HttpModule,
    ],
    controllers: [HealthController, DataController],
    providers: [DataService],
})
export class AppModule { }