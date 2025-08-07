import { UserOrmEntity } from "src/modules/users/infrastructure/entities/user-orm-entity";
import { BaseEntity } from "src/shared/infrastructure/entities/base.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity('auth_sessions')
@Index(['refreshToken'], { unique: true })
@Index(['userId', 'expiresAt'])
export class AuthSessionOrmEntity extends BaseEntity {
    @Column( {name: 'user_id'} )
    userId: number;

    @Column( {name: 'access_token', type: 'text'} )
    accessToken: string;

    @Column( {name: 'refresh_token', type: 'text', unique: true} )
    refreshToken: string;

    @Column( {name: 'expires_at', type: 'timestamp'} )
    expiresAt: Date;

    @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;
}