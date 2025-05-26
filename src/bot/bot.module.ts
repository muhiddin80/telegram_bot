import { Module } from "@nestjs/common";
import { BotUpdate } from "./bot.update";

@Module({
    imports:[BotUpdate]
})

export class BotModule {}