import redis from 'redis';

const client = redis.createClient ({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
});

client.on('error', (err) => {
    console.error('Redis erros: ', err);
});

export default client;