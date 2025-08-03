import { ConfigService } from "@nestjs/config";
import { ThrottlerAsyncOptions } from "@nestjs/throttler";

export const throttlerConfig: ThrottlerAsyncOptions = {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        throttlers: [
            {
                ttl: parseInt(configService.get('THROTTLER_TTL') || '60000', 10),
                limit: parseInt(configService.get('THROTTLER_LIMIT') || '10', 10),
            }
        ]
    }),
};