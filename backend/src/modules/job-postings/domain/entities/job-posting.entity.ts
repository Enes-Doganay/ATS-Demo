export class JobPosting {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly location: string,
        public readonly postedBy: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}
}
