import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../../domain/enums/user-role.enum";
import { CandidateOrmEntity } from "src/modules/candidates/infrastructure/entities/candidate-orm.entity";

@Entity('users')
export class UserOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.RECRUITER
    })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => CandidateOrmEntity, (candidate) => candidate.user)
    candidates: CandidateOrmEntity[];
}