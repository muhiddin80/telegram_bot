import { Ctx, On, Start, Update } from "nestjs-telegraf";
import * as path from "path";
import * as fs from "node:fs"
import { Context } from "telegraf";
import axios from "axios";

@Update()
export class BotUpdate {
    constructor(){}

    @Start()
    async startBot(@Ctx() ctx:Context){
        const imagePath = path.join(process.cwd(),'static','download (2).jfif')
        await ctx.replyWithPhoto(
            {source:fs.readFileSync(imagePath)},
            {caption:'Hello🤗 this bot gives you location of any city!'}
        )
    } 

    @On('message')
    async message(@Ctx() ctx:Context &{message:{text:string}}){
        try {
            const name = ctx.message.text;
            await ctx.reply("Please wait a moment!")
            const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: name,
                    format: 'json',
                    limit: 1
                },
                headers: {
                    'User-Agent': 'Navigation bot/1.0'
                }
            })
            if(geoRes.data.length===0){
                ctx.reply('City not found!❌')
                return
            }
            const lat = parseFloat(geoRes.data[0].lat)
            const lon = parseFloat(geoRes.data[0].lon)
            await ctx.replyWithLocation(lat,lon)
            } catch(error){
                ctx.reply('Something went wrong!❌')
            }           
    }
}
