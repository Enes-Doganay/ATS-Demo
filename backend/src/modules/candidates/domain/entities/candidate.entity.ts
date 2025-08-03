export class Candidate {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly resumeUrl: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}