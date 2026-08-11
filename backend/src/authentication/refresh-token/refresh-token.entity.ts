// mongo document for refresh token

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";



@Entity()
export class RefreshToken {

    @PrimaryColumn({ type: "char", length: 64 })
    tokenHash!: string;

    @Column()
    userId!: string;

    @Column()
    expiresAt!: Date;

    @Column()
    revoked!: boolean;

    @CreateDateColumn()
    createdAt!: Date;


}

