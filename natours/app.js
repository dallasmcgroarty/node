const express = require('express');
const fs = require('fs');

const app = express();

// routing
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({message: 'Hello from the server!', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// handle get requests 
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
});

// define port number
const port = 3000;

// setup server to listen on specified port
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
