import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';

async function bootstrap() {
  const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);
  console.log(`Production mode: ${isProduction}`);

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  // swagger for not prod
  if (!isProduction || 1) {
    const config = new DocumentBuilder()
      .setTitle('The Garden API')
      .setDescription('This a the project document')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const customOptions: SwaggerCustomOptions = {
      customSiteTitle: 'The Garden API Docs',
    };
    SwaggerModule.setup('/docs', app, document, customOptions);
  }

  await app.listen(process.env.PORT || 8080);
  console.log(`TheGarden swagger is running on:  ${await app.getUrl()}/docs`);
  console.log(`Application is running on: ${await app.getUrl()}/`);
}
bootstrap();
