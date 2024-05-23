const { Pool} = require('pg');

const db = new Pool({
    connectionString:"postgresql://u7bzyjtcxjaiqdz3qyuc:knnxDyixe7fv7EvWIj56hapMJdyDjU@bmrzifsr9c51vdpjizeu-postgresql.services.clever-cloud.com:50013/bmrzifsr9c51vdpjizeu"
})

module.exports = db;