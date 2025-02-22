import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const PORT = configService.get<number>("PORT");

    app.setGlobalPrefix("/api");
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.useGlobalInterceptors(new LoggingInterceptor());

    await app.listen(PORT, () => console.log(`Server is listening to the PORT: ${PORT}`));
}
bootstrap();
