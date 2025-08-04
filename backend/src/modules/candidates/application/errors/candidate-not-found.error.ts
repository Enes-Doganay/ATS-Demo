export class CandidateNotFoundError extends Error {
    constructor(id: number) {
        super(`Candidate with ID ${id} not found`);
        this.name = 'CandidateNotFoundError';
    }
}