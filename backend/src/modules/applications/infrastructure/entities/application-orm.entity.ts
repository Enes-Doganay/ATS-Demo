import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Status } from "../../domain/enums/status.enum";
import { CandidateOrmEntity } from "src/modules/candidates/infrastructure/entities/candidate-orm.entity";
import { JobPostingOrmEntity } from "src/modules/job-postings/infrastructure/entities/job-posting-orm.entity";
import { BaseEntity } from "src/shared/infrastructure/entities/base.entity";

@Entity('applications')
export class ApplicationOrmEntity extends BaseEntity {
    @Column({ name: 'candidate_id', type: 'int' })
    candidateId: number;

    @Column({ name: 'job_posting_id', type: 'int' })
    jobPostingId: number;

    @Column({ name: 'applied_at', type: 'timestamp' })
    appliedAt: Date;

    @Column({ name: 'status', type: 'enum', enum: Status })
    status: Status;

    @ManyToOne(() => CandidateOrmEntity, (candidate) => candidate.applications)
    @JoinColumn({ name: 'candidate_id' })
    candidate: CandidateOrmEntity;

    @ManyToOne(() => JobPostingOrmEntity, (jobPosting) => jobPosting.applications)
    @JoinColumn({ name: 'job_posting_id' })
    jobPosting: JobPostingOrmEntity;
}