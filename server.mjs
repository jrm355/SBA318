//IMPORTS

import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { dogs } from './data/dogs.mjs';
import { writeFile } from 'fs/promises';  // Import fs/promises to modify dogs.mjs, inputs added to dogs.mjs
import morgan from 'morgan';
import { roles } from './data/roles.mjs';

//instance of express 
const app = express();
let PORT = 3000;

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);  // Get the filename
const __dirname = path.dirname(__filename);  // Get the directory name

//setting ejs as view engine
app.set('view engine', 'ejs');
//defining where they are located
app.set('views', path.join(__dirname, 'views'));


//middleware
//parse json
app.use(express.json());
//serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));  // For parsing form data
//utilize morgan
app.use(morgan('dev'));  // Log requests to the console

//routes
//Getting Dogs
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the casting page, using EJS to render roles and dogs
app.get('/casting', (req, res) => {
  res.render('casting', { dogs, roles }); // Pass both dogs and roles to the EJS template
});

// POST route to add new dog
app.post('/add-dog', async (req, res) => {
  const { name, breed, size } = req.body;
  const newDog = {
    id: dogs.length + 1,
    name,
    breed,
    size
  };

  dogs.push(newDog);

  const dogsFilePath = path.join(__dirname, 'data', 'dogs.mjs');
  const dogsFileContent = `export const dogs = ${JSON.stringify(dogs, null, 2)};`;

  try {
    await writeFile(dogsFilePath, dogsFileContent);
    res.redirect('/casting'); // Redirect back to the casting page after submission
  } catch (error) {
    console.error('Error writing to dogs.mjs:', error);
    res.status(500).json({ message: 'Error adding dog' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});