import { Expose } from "class-transformer";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    @Expose()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Expose()
    updatedAt: Date;
}