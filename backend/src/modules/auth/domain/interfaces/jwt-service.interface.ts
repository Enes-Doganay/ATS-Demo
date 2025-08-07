export interface IJwtService {
    generateAccessToken(payload: any): string;
    generateRefreshToken(payload: any): string;
    verifyToken(token: string): any;
    verifyRefreshToken(token: string): any;
}