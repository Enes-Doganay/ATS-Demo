import { IBaseRepository } from "src/shared/domain/interfaces/base-repository.interface";
import { AuthSession } from "../entities/auth-session.entity";

export interface IAuthSessionRepository extends IBaseRepository<AuthSession> {
    findByRefreshToken(token: string): Promise<AuthSession | null>;
    deleteByUserId(userId: number): Promise<void>;
}