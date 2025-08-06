import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/shared/infrastructure/repositories/base.repository";
import { Application } from "../../domain/entities/application.entity";
import { ApplicationOrmEntity } from "../entities/application-orm.entity";
import { IApplicationRepository } from "../../domain/interfaces/application-repository.interface";
import { ApplicationFactory } from "../../application/factories/application.factory";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ApplicationRepository extends BaseRepository<Application, ApplicationOrmEntity> implements IApplicationRepository {
    private readonly applicationFactory = new ApplicationFactory();

    constructor(
        @InjectRepository(ApplicationOrmEntity)
        repository: Repository<ApplicationOrmEntity>,
    ) {
        super(repository);
    }

    protected getFactory() {
        return this.applicationFactory;
    }
    
}