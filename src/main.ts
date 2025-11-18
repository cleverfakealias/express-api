import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global validation pipe with latest best practices
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // Enable CORS with security considerations
    app.enableCors({
        origin: process.env.NODE_ENV === 'production' ? false : true,
        credentials: true,
    });

    // Swagger API documentation
    const config = new DocumentBuilder()
        .setTitle('Express API')
        .setDescription('Modern Nest.js API with health check and filtering')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT ?? 3000;
    await app.listen(port);

    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api`);
}

bootstrap();