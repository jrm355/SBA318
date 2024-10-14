//curl -X DELETE http://localhost:3000/dogs/1

import express from 'express';
import { dogs } from '../data/dogs.mjs'; 
import { writeFile } from 'fs/promises'; 
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Route to delete a dog by its ID
router.delete('/dogs/:id', async (req, res) => {
  const { id } = req.params;

  // Find the index of the dog to be deleted
  const dogIndex = dogs.findIndex((dog) => dog.id === parseInt(id));

  if (dogIndex === -1) {
    return res.status(404).json({ message: `Dog with ID ${id} not found` });
  }

  // Remove the dog from the array
  const removedDog = dogs.splice(dogIndex, 1);

  // Update the dogs.mjs file with the new data
  const dogsFilePath = path.join(__dirname, '../data/dogs.mjs');
  const updatedDogsContent = `export const dogs = ${JSON.stringify(dogs, null, 2)};`;

  try {
    await writeFile(dogsFilePath, updatedDogsContent);
    res.status(200).json({ message: `Dog with ID ${id} deleted successfully`, deletedDog: removedDog });
  } catch (error) {
    console.error('Error writing to dogs.mjs:', error);
    res.status(500).json({ message: 'Error deleting dog' });
  }
});

export default router;