import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const authHeader = req.headers['authorization'] || req.headers['Authorization'] as string | undefined;

		if (!authHeader) {
			(req as any).user = null;
			return true;
		}

		const [scheme, token] = authHeader.split(' ');
		if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
			(req as any).user = null;
			return true;
		}

		try {
				const secret = this.configService.get<string>('JWT_SECRET');
				const payload = await this.jwtService.verifyAsync(token, secret ? { secret } : undefined);
				(req as any).user = payload;
			} catch (_) {
			(req as any).user = null;
		}

		return true;
	}
}

