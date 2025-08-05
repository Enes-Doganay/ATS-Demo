import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Expose } from "class-transformer";
import { BaseEntity } from "../../../../shared/infrastructure/entities/base.entity";
import { UserOrmEntity } from "src/modules/users/infrastructure/entities/user-orm-entity";
@Entity('candidates')
export class CandidateOrmEntity extends BaseEntity {
    @Column( { name: 'user_id', type: 'int' })
    @IsNotEmpty()
    @Expose()
    userId: number;

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    @IsNotEmpty()
    @Expose()
    firstName: string;

    @Column( { name: 'last_name', type: 'varchar', length: 100})
    @IsNotEmpty()
    @Expose()
    lastName: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
    @IsOptional()
    @Expose()
    phone?: string;

    @Column( { name: 'resume_url', type: 'varchar', length: 255, nullable: true })
    @IsOptional()
    @Expose()
    resumeUrl?: string;

    @ManyToOne(() => UserOrmEntity, (user) => user.candidates)
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;
}