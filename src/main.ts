import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Security
    app.use(helmet());
    app.enableCors({
      origin: function (origin, callback) {
        if (!origin || origin.includes('localhost') || origin.endsWith('vercel.app') || origin === process.env.FRONTEND_URL) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    });

    // Global prefix
    app.setGlobalPrefix('api');

    // Validation
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

    // Interceptors & Filters
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new PrismaExceptionFilter());

    // Swagger
    const config = new DocumentBuilder()
      .setTitle('Flairvigo API')
      .setDescription('Premium Fashion Ecommerce Platform API')
      .setVersion('1.0')
      .addServer('https://flairvigo-backend-production-9361.up.railway.app', 'Production Server')
      .addServer(`http://localhost:${process.env.PORT || 4000}`, 'Local Development Server')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = parseInt(process.env.PORT || '4000', 10);

    // Serve root route to avoid 404
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/', (req, res) => {
      res.send({ status: 'ok', message: 'API is running', docs: '/api/docs' });
    });

    await app.listen(port);
    console.log(`🚀 Flairvigo API running on port ${port}`);
    console.log(`📄 Swagger docs at http://localhost:${port}/api/docs`);
  } catch (err) {
    console.error('❌ Error during application bootstrap:', err);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception thrown:', err);
});

bootstrap();
