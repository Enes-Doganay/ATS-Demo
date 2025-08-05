export interface IBaseFactory<TDomain, TOrm, TCreateDto, TUpdateDto, TDto> {
    createFromDto(dto: TCreateDto): TDomain | Promise<TDomain>;
    fromEntity(entity: TOrm): TDomain;
    toEntity(domain: TDomain): TOrm;
    updateFromDto(existing: TDomain, dto: TUpdateDto): TDomain | Promise<TDomain>;
    toDto(domain: TDomain): TDto;
}