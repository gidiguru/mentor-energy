import type { RateLimitData } from '../types/ratelimiter'

const attempts = new Map<string, RateLimitData>();

export function createRateLimiter(config: { maxAttempts: number; window: number }) {
 return {
   async check(key: string): Promise<{ remaining: number; reset: number }> {
     const now = Date.now();
     const attempt = attempts.get(key) || { count: 0, timestamp: now };
     
     if (now - attempt.timestamp > config.window * 1000) {
       attempt.count = 0;
       attempt.timestamp = now;
     }
     
     attempt.count++;
     attempts.set(key, attempt);
     
     return {
       remaining: config.maxAttempts - attempt.count,
       reset: Math.max(0, config.window - (now - attempt.timestamp)/1000)
     };
   }
 };
}