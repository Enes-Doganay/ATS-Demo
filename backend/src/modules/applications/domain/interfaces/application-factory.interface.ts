import { IBaseFactory } from "src/shared/domain/interfaces/base-factory.interface";
import { Application } from "../entities/application.entity";
import { ApplicationOrmEntity } from "../../infrastructure/entities/application-orm.entity";
import { CreateApplicationDto } from "../../application/dto/create-application.dto";
import { UpdateApplicationDto } from "../../application/dto/update-application.dto";
import { ApplicationDto } from "../../application/dto/application.dto";

export interface IApplicationFactory extends IBaseFactory<Application, ApplicationOrmEntity, CreateApplicationDto, UpdateApplicationDto, ApplicationDto> {   
}