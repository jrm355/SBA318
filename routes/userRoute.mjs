// Allows you to got to http://localhost:3000/dogs/breed/Cat , Husky, Pug to filter out. 

import express from 'express';
import { dogs } from '../data/dogs.mjs';

const router = express.Router();

// Route to filter dogs by breed
router.get('/dogs/breed/:breed', (req, res) => {
  const { breed } = req.params;

  // Filter the dogs by the breed f
  const filteredDogs = dogs.filter((dog) => dog.breed.toLowerCase() === breed.toLowerCase());

  // If no dogs match the breed
  if (filteredDogs.length === 0) {
    return res.status(404).json({ message: `No dogs of breed ${breed} found` });
  }

  // Return the filtered list of dogs
  res.json(filteredDogs);
});

export default router;