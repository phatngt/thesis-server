import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
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
  const configService = app.get(ConfigService);
  console.log("AWS_REGION: ", configService.get("AWS_REGION"))
  config.update({
    region: configService.get("AWS_REGION"),
    credentials: {
      accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY")
    }
  })

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
