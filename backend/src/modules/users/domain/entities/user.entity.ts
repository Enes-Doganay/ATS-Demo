import { UserRole } from "../enums/user-role.enum";

export class User {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: UserRole,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}