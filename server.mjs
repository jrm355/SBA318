//IMPORTS

import express from 'express';
import path from 'path'; 
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { dogs } from './data/dogs.mjs';
import { writeFile } from 'fs/promises';  // Import fs/promises to modify dogs.mjs, inputs added to dogs.mjs

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

app.post('/add-dog', async (req, res) => {
  const { name, breed, size } = req.body;

  // Create a new dog object
  const newDog = {
      id: dogs.length + 1,
      name,
      breed,
      size
  };

  // Add the new dog to the dogs array
  dogs.push(newDog);

  // Update the dogs.mjs file with the new data
  const dogsFilePath = path.join(__dirname, 'dogs.mjs');
  const dogsFileContent = `export const dogs = ${JSON.stringify(dogs, null, 2)};`;

  try {
      await writeFile(dogsFilePath, dogsFileContent);
      res.status(200).json({ message: 'Dog added successfully!' });
  } catch (error) {
      console.error('Error writing to dogs.mjs:', error);
      res.status(500).json({ message: 'Error adding dog' });
  }
});

// Route to serve the homepage (input form)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the casting page
app.get('/casting', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'casting.html'));
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});