import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  await app.listen(3000);
}
bootstrap();
