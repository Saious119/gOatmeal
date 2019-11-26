module.exports = {
  DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'http://fortrash.com:27017',
  APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 80,
};
