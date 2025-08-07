import { User } from "src/modules/users/domain/entities/user.entity";
import { AuthSession } from "../entities/auth-session.entity";

export interface IAuthService {
    validateUser(email: string, password: string): Promise<User>
    login(user: User): Promise<AuthSession>;
    logout(userId: number): Promise<void>;
    refreshToken(refreshToken: string): Promise<{ session: AuthSession; user: User }>;
    validateTokenPayload(payload: any): Promise<User | null>;
}