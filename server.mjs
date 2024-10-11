//IMPORTS

import express from 'express';
// import userRoutes from './routes/userRoutes.mjs';
// import postRoutes from './routes/postRoutes.mjs';
// import bodyParser from 'body-parser';


//instance of express 
const app = express();
let PORT = 3000;

//middleware

//routes

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });