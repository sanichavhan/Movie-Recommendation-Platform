const Redis = require("ioredis").default

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
    maxRetriesPerRequest: 3
})

redis.on("connect", () => {
    console.log("✅ Connected to Redis cache")
})

redis.on("error", (err) => {
    console.warn("⚠️  Redis connection warning:", err.message);
    console.warn("Continuing without Redis cache functionality");
})

redis.on("reconnecting", () => {
    console.log("🔄 Attempting to reconnect to Redis...");
})

module.exports = redis