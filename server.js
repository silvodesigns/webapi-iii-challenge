const express = require('express');
const userRouter = require('./users/userRouter.js');

const server = express();
server.use(express.json());

server.use(methodLogger);
server.use('/api/users',userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

 function methodLogger(req, res, next) {
      const timestamp = new Date();
      console.log(`${req.method}  Request`);
      console.log(`${req.url}  URL`);
      console.log(`${timestamp}  TimeStamp`);
      next();
};



module.exports = server;
