import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { Response } from "express";
import { InvalidCredentialsError } from "src/modules/auth/domain/errors/invalid-credentials.error";
import { InvalidTokenError } from "src/modules/auth/domain/errors/invalid-token.error";
import { EntityNotFoundError } from "src/shared/domain/errors/entity-not-found.error";

@Catch()
export class DomainExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof EntityNotFoundError) {
            return response.status(404).json({
                statusCode: 404,
                message: exception.message
            });
        }

        if (exception instanceof InvalidCredentialsError) {
            return response.status(401).json({
                statusCode: 401,
                message: exception.message
            });
        }

        if (exception instanceof InvalidTokenError) {
            return response.status(401).json({
                statusCode: 401,
                message: exception.message
            });
        }

        if (exception instanceof UnauthorizedException) {
            return response.status(401).json({
                statusCode: 401,
                message: exception.message || 'Unauthorized'
            });
        }

        if (exception instanceof TokenExpiredError) {
            return response.status(401).json({
                statusCode: 401,
                message: 'Token has expired'
            });
        }

        if (exception instanceof JsonWebTokenError) {
            return response.status(401).json({
                statusCode: 401,
                message: 'Invalid token'
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