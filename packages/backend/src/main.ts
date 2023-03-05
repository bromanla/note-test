import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const serverUrl = configService.get<string>('SWAGGER_PREFIX');

  if (configService.get<string>('NODE_ENV') === 'development') app.enableCors();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swagger = new DocumentBuilder()
    .setTitle('Severstal Note')
    .setDescription('Тестовое задание')
    .setVersion('1.0');

  if (serverUrl) swagger.addServer(serverUrl);

  const document = SwaggerModule.createDocument(app, swagger.build());
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
