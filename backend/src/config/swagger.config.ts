import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = () => {
    return new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Candidates')
        .build()
}