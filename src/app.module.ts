import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CoreModule, BotModule, ConfigModule.forRoot({
    envFilePath: `${process.env.NODE_ENV}.env` 
  })],
})
export class AppModule {}
