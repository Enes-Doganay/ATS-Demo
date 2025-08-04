import { ObjectLiteral, Repository } from 'typeorm';
import { IBaseRepository } from '../../domain/interfaces/base-repository.interface';

export abstract class BaseRepository<TDomain, TOrm extends ObjectLiteral> implements IBaseRepository<TDomain> {
    constructor(
        protected readonly repository: Repository<TOrm>,
    ) {}

    protected abstract getFactory(): any;

    async findById(id: number): Promise<TDomain | null> {
        const entity = await this.repository.findOne({ where: { id } } as any);
        if (!entity) return null;
        
        return this.getFactory().fromEntity(entity);
    }

    async findAll(): Promise<TDomain[]> {
        const entities = await this.repository.find();
        return entities.map(entity => this.getFactory().fromEntity(entity));
    }

    async create(domainEntity: TDomain): Promise<TDomain> {
        const ormEntity = this.getFactory().toEntity(domainEntity);
        const createdEntity = await this.repository.save(ormEntity);
        return this.getFactory().fromEntity(createdEntity);
    }

    async update(domainEntity: TDomain): Promise<TDomain> {
        const ormEntity = this.getFactory().toEntity(domainEntity);
        await this.repository.update((domainEntity as any).id, ormEntity);
        return domainEntity;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}