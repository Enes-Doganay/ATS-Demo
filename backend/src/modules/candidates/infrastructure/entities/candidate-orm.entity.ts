import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../../shared/infrastructure/entities/base.entity";
import { UserOrmEntity } from "src/modules/users/infrastructure/entities/user-orm-entity";
@Entity('candidates')
export class CandidateOrmEntity extends BaseEntity {
    @Column( { name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    firstName: string;

    @Column( { name: 'last_name', type: 'varchar', length: 100})
    lastName: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column( { name: 'resume_url', type: 'varchar', length: 255, nullable: true })
    resumeUrl?: string;

    @ManyToOne(() => UserOrmEntity, (user) => user.candidates)
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;
}