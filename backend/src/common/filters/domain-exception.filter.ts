import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { CandidateNotFoundError } from "src/modules/candidates/application/errors/candidate-not-found.error";
import { Response } from "express";

@Catch()
export class DomainExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof CandidateNotFoundError) {
            return response.status(404).json({
                statusCode: 404,
                message: exception.message
            });
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res = exception.getResponse();
            return response.status(status).json(res);
        }

        return response.status(500).json({
            statusCode: 500,
            message: 'Internal server error'
        });

    }

}