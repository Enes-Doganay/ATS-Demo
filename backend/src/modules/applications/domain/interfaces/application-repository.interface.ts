import { IBaseRepository } from "src/shared/domain/interfaces/base-repository.interface";
import { Application } from "../entities/application.entity";

export interface IApplicationRepository extends IBaseRepository<Application> {
}