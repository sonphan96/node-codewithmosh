const path = require('path');
const os = require('os');
const fs = require('fs');

const EventEmitter = require('events');
const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if(req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});



server.listen(3000);

console.log('Listening on port 3000...')





// const pathObj = path.parse(__filename);

// const totalMemory = os.totalmem();
// const freeMemory = os.freemem();


// Register a listener

// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', (arg) => {
//   console.log('Listener Called', arg)
// })

// logger.log('Message');