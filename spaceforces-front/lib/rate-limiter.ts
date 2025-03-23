class RateLimiter {
  private attempts: Map<string, number>;
  private timestamps: Map<string, number>;
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.attempts = new Map();
    this.timestamps = new Map();
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const timestamp = this.timestamps.get(key) || 0;
    const attempts = this.attempts.get(key) || 0;

    if (now - timestamp > this.windowMs) {
      this.attempts.set(key, 1);
      this.timestamps.set(key, now);
      return false;
    }

    if (attempts >= this.maxAttempts) {
      return true;
    }

    this.attempts.set(key, attempts + 1);
    return false;
  }

  reset(key: string): void {
    this.attempts.delete(key);
    this.timestamps.delete(key);
  }
}

export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes