import { UserOrmEntity } from "src/modules/users/infrastructure/entities/user-orm-entity";
import { BaseEntity } from "src/shared/infrastructure/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('job_postings')
export class JobPostingOrmEntity extends BaseEntity {
    @Column( {name: 'title', type: 'varchar' })
    title: string;

    @Column( {name: 'description', type: 'text' })
    description: string;

    @Column( {name: 'location', type: 'varchar' })
    location: string;

    @Column( {name: 'posted_by', type: 'int' })
    postedBy: number;

    @ManyToOne(() => UserOrmEntity, (user) => user.jobPostings)
    @JoinColumn({ name: 'posted_by' })
    user: UserOrmEntity;
}