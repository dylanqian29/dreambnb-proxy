require('newrelic');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const port = process.env.PORT || 8888;

app.use(morgan('dev'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());


// serve client files
app.use('/rooms/:roomId', express.static(path.join(__dirname, '/../public')));


// app.get('/rooms', (res, req)=> {

// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
