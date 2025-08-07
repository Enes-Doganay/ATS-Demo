export class EntityNotFoundError extends Error {
    constructor(entityName: string, id: number) {
        super(`${entityName} with ID '${id}' not found.`);
        this.name = 'EntityNotFoundError';
    }
}