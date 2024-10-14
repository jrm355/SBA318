//filtering 
import express from 'express';
import { dogs } from '../data/dogs.mjs';
import { writeFile } from 'fs/promises';
import path from 'path';

const router = express.Router();

// Define allowed breeds
const allowedBreeds = ['Husky', 'Pug', 'Cat'];

// Route to handle adding a dog
router.post('/add-dog', async (req, res) => {
  const { name, breed, size } = req.body;

  // Check if the breed is one of the allowed breeds
  if (!allowedBreeds.includes(breed)) {
    return res.status(400).json({ message: 'Only Husky, Pug, or Cat allowed.' });
  }

  // Create a new dog object
  const newDog = {
    id: dogs.length + 1,
    name,
    breed,
    size,
  };

  // Adding new dog to the dogs array
  dogs.push(newDog);

  // Update the dogs.mjs file with the new data
  const dogsFilePath = path.join(process.cwd(), 'data', 'dogs.mjs');
  const dogsFileContent = `export const dogs = ${JSON.stringify(dogs, null, 2)};`;

  try {
    await writeFile(dogsFilePath, dogsFileContent);
    res.redirect('/casting'); // Redirect to the casting page 
  } catch (error) {
    console.error('Error writing to dogs.mjs:', error);
    res.status(500).json({ message: 'must be Husky, Cat, or Pug' });
  }
});

export default router;