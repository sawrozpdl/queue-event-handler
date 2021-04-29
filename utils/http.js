const axios = require("axios");

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
    authorization: `APIKEY ${process.env.API_KEY}`,
  },
});

module.exports = http;
