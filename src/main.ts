import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000

  await app.listen(Port,()=>{
    console.log(`The server is running on port ${Port}`)
  })
}
bootstrap();
