const express = require('express');
const server = express();
const PORT = 3000;

// set up postgres db connection pool
const { Pool } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'testdb',
	password: 'password',
	port: 5432,
});

// show postgres dbs info
server.get('/', (req, res) =>  {
	res.send(pool.query('SELECT * FROM pg_database;', (err, res) => {
		// log error/response
		if (err) console.log(err);
		console.log(res); 
		//close pool
		pool.end(); 
	})
	);
});

server.listen(PORT, () => {console.log(`Server running on ${PORT}`);});
