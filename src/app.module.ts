import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
    TelegrafModule.forRoot({
      token:process.env.BOT_TOKEN as string
    }),
    BotModule],
})
export class AppModule {}
