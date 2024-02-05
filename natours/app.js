const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json())

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

// handle get all tours requests 
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
});

app.get('/api/v1/tours/:id', (req, res) => {
  // const tour = tours.filter((tour) => {
  //   return tour.id == req.params.id;
  // });
  const tour = tours.find((tour) => tour.id == req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
});

// handle post new tour requests
app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length -1].id + 1;
  const newTour = {
    id: newId,
    ...req.body
  };
  

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  });
});

// handle patch update a tour by id
app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour does not exist'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    }
  })
});

// handle delete a tour by id
app.delete('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour does not exist'
    })
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// define port number
const port = 3000;

// setup server to listen on specified port
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
