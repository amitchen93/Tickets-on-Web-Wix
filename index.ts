import express from 'express';  // pck for create js server
import bodyParser = require('body-parser');
import { tempData } from './temp-data';  // kind of data-base for this exercise
import { serverAPIPort, APIPath } from '@fed-exam/config';

console.log('starting server', { serverAPIPort, APIPath });

// call fuction that return object of express pck
// with a lot of methods that connet to the server (like get, put (update data))
const app = express();  

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// if we came to the url APIPath , and ask some "get" then we do arrow function
app.get(APIPath, (req, res) => {  
  // @ts-ignore
  res.send(tempData);  // send all the tickets to the client. but what with the EXPONENTIAL problem?
  // sol:  I should send to server the value of the btn of pagination (page 2? send 20 tickets .. page 3? send another 20 tickets)
});


// ":" represent that sortBy is variable that can change (sort by title, email, date..)
app.get(`${APIPath}/:sortBy`, (req, res) => {

  const sortBy = req.params.sortBy;  // the sortBy from above ('title' or 'email' or 'date')
  const x = [...tempData];  // ... = copy of tempData is the array of Tickets

  // like comparator
  if (sortBy === 'title') {
    x.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    res.send(x);
  }
  if (sortBy === 'email') {
    x.sort((a, b) => (a.userEmail > b.userEmail) ? 1 : ((b.userEmail > a.userEmail) ? -1 : 0))
    res.send(x);
  }
  if (sortBy === 'date') {
    x.sort((a, b) => (a.creationTime > b.creationTime) ? 1 : ((b.creationTime > a.creationTime) ? -1 : 0))
    res.send(x);
  }
});

// call to the server with serverAPIPort.  without this line the server is not running
app.listen(serverAPIPort, () => console.log(`server running, ${serverAPIPort}`));

// how it was is the start
// app.get(APIPath, (req, res) => {

//   // @ts-ignore
//   const page: number = req.query.page || 1;

//   const paginatedData = tempData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);  

//   res.send(paginatedData);

  
// });