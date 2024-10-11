//IMPORTS

import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';
// import userRoutes from './routes/userRoutes.mjs';
// import roleRoutes from './routes/postRoutes.mjs';
import bodyParser from 'body-parser';
import { dogs } from './data/dogs.mjs';


//instance of express 
const app = express();
let PORT = 3000;

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);  // Get the filename
const __dirname = path.dirname(__filename);  // Get the directory name


//middleware
//serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

//routes
//Getting Dogs
app.get('/api/dogs', (req, res) => {
  res.json(dogs);
});

//Getting Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//casting page
app.get('/casting', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'casting.html'));
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});