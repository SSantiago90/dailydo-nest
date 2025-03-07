import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
 
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  const config = new DocumentBuilder()
   .setTitle('DailyDo API')
   .setDescription('Your daily tasks in one App')
   .setVersion('1.0')
   .build();
  const documentFactory = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  
  try {
    const port = configService.get('PORT');
    console.log(`Starting app on port ${port}`);

    await app.listen(port);
    console.log('Application started successfully on port', port);

    // Log something periodically to confirm the app is runningu
    setInterval(() => {
      console.log('App is running...');
    }, 60000); // Log every minute

  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();