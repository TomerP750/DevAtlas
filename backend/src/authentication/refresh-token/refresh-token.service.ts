import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { createHash, randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import ms, { type StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class RefreshTokenService {

    constructor(
        @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
        private readonly configService: ConfigService,
    ) { }

    async create(userId: string): Promise<string> {

        const rawToken = await this.generateRefreshToken();
        const tokenHash = await this.hashRefreshToken(rawToken);
        const refreshToken = this.refreshTokenRepository.create({
            tokenHash,
            userId,
            expiresAt: new Date(
                Date.now() + ms(
                    this.configService.getOrThrow<StringValue>(
                        'REFRESH_TOKEN_EXPIRATION_TIME',
                    ),
                ),
            ),
            revoked: false,
        });

        await this.refreshTokenRepository.save(refreshToken);
        return rawToken;
    }

    async validate(rawToken: string): Promise<RefreshToken> {

        if (!rawToken) {
            throw new UnauthorizedException('Missing refresh token');
        }

        const refreshToken = await this.refreshTokenRepository.findOneBy({
            tokenHash: await this.hashRefreshToken(rawToken),
        });

        if (!refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (refreshToken.revoked) {
            throw new UnauthorizedException('Revoked refresh token');
        }

        if (refreshToken.expiresAt < new Date()) {
            throw new UnauthorizedException('Expired refresh token');
        }

        return refreshToken;
    }

    async rotate(rawToken: string): Promise<string> {
        if (!rawToken) {
            throw new UnauthorizedException('Missing refresh token');
        }

        const oldTokenHash = await this.hashRefreshToken(rawToken);
        const newRawToken = await this.generateRefreshToken();
        const newTokenHash = await this.hashRefreshToken(newRawToken);
        const now = new Date();

        await this.refreshTokenRepository.manager.transaction(async manager => {
            const result = await manager.update(
                RefreshToken,
                {
                    tokenHash: oldTokenHash,
                    revoked: false,
                    expiresAt: MoreThan(now),
                },
                { revoked: true },
            );

            if (result.affected !== 1) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const newRefreshToken = manager.create(RefreshToken, {
                tokenHash: newTokenHash,
                userId: await manager.findOneByOrFail(RefreshToken, {
                    tokenHash: oldTokenHash,
                }).then(token => token.userId),
                expiresAt: new Date(
                    Date.now() + ms(
                        this.configService.getOrThrow<StringValue>(
                            'REFRESH_TOKEN_EXPIRATION_TIME',
                        ),
                    ),
                ),
                revoked: false,
            });

            await manager.save(newRefreshToken);
        });

        return newRawToken;
    }

    async revoke(rawToken: string): Promise<void> {
        if (!rawToken) {
            throw new UnauthorizedException('Missing refresh token');
        }

        const tokenHash = await this.hashRefreshToken(rawToken);

        await this.refreshTokenRepository.manager.transaction(async manager => {
            const refreshToken = await manager.findOne(RefreshToken, {
                where: { tokenHash },
                lock: { mode: 'pessimistic_write' },
            });

            if (!refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            if (refreshToken.revoked) {
                throw new UnauthorizedException('Revoked refresh token');
            }

            if (refreshToken.expiresAt < new Date()) {
                throw new UnauthorizedException('Expired refresh token');
            }

            refreshToken.revoked = true;
            await manager.save(refreshToken);
        });
    }

    async revokeAllForUser(userId: string) {
        await this.refreshTokenRepository.update({ userId }, { revoked: true });
    }

    private async generateRefreshToken() {
        return randomBytes(32).toString('hex');
    }

    private async hashRefreshToken(token: string) {
        return createHash('sha256').update(token).digest('hex');
    }
}
