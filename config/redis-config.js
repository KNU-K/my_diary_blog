const redis = require("redis");

const client = redis.createClient({
  host: "redis-token",
  port: 6379,
});

client
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch((err) => {
    console.error(`Error connecting to Redis: ${err}`);
  });

module.exports = {
  client: client,
};
