import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [CoreModule, BotModule],
})
export class AppModule {}
