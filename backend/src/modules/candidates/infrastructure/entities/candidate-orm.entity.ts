import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseEntity } from "./base.entity";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Expose } from "class-transformer";

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

  // Relations
//   @ManyToOne(() => User, (user) => user.candidates)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @OneToMany(() => Application, (application) => application.candidate)
//   applications: Application[];
}