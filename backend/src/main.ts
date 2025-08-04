import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'process';
import { swaggerConfig } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  app.use(helmet());

  const configService = app.get(ConfigService);
  const enableSwagger = configService.get('ENABLE_SWAGGER');

  if (enableSwagger === 'true') {
    const document = SwaggerModule.createDocument(app, swaggerConfig());
    SwaggerModule.setup('api', app, document);
    app.use('/api-json', (req, res) => res.json(document));
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
