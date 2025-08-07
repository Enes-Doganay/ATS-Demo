export class AuthSession {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly accessToken: string,
        public readonly refreshToken: string,
        public readonly expiresAt: Date,
        public readonly createdAt: Date,
        public readonly updatedAt?: Date,
    ) {}
}
