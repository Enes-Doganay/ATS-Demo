import { Status } from "../enums/status.enum";

export class Application {
    constructor(
        public readonly id: number,
        public readonly candidateId: number,
        public readonly jobPostingId: number,
        public readonly appliedAt: Date,
        public readonly status: Status,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
