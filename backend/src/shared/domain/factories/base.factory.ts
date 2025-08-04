import { IBaseFactory } from "../interfaces/base-factory.interface";

export abstract class BaseFactory<TDomain, TOrm, TCreateDto, TUpdateDto, TDto>
    implements IBaseFactory<TDomain, TOrm, TCreateDto, TUpdateDto, TDto> {
    abstract createFromDto(dto: TCreateDto): TDomain;
    abstract fromEntity(entity: TOrm): TDomain;
    abstract toEntity(domain: TDomain): TOrm;
    abstract updateFromDto(existing: TDomain, dto: TUpdateDto): TDomain;
    abstract toDto(domain: TDomain): TDto;

    protected getCurrentTimeStamp(): Date {
        return new Date();
    }
}