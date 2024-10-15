//IMPORTS
//utilize curl to add 
// curl -X PUT http://localhost:3000/api/roles/1 \
//   -H "Content-Type: application/json" \
//   -d '{
//     "title": "Updated Title for Mr. Peanut Butter",
//     "synopsis": "A new adventure"
//   }'


import express from 'express';
import path from 'path';
import { roles } from '../data/roles.mjs'; 
import { writeFile } from 'fs/promises'; 
import { fileURLToPath } from 'url'; 

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize router
const router = express.Router();

// PUT Route to update a role by ID
router.put('/roles/:id', async (req, res) => {
    const roleId = parseInt(req.params.id); // Extract role ID from params
    const { title, synopsis } = req.body;  // Extract data from the request body

    // Find the role with the given ID
    const roleIndex = roles.findIndex(role => role.id === roleId);

    if (roleIndex === -1) {
        return res.status(404).json({ message: 'Role not found' }); // Return 404 if role not found
    }

    // Update the role's details
    roles[roleIndex].title = title || roles[roleIndex].title;  // Update title if provided
    roles[roleIndex].synopsis = synopsis || roles[roleIndex].synopsis; // Update synopsis if provided

    // Update the roles.mjs file with the new data
    const rolesFilePath = path.join(__dirname, '../data/roles.mjs');
    const rolesFileContent = `export const roles = ${JSON.stringify(roles, null, 2)};`;

    try {
        await writeFile(rolesFilePath, rolesFileContent);
        res.status(200).json({ message: 'Role updated successfully', role: roles[roleIndex] });
    } catch (error) {
        console.error('Error writing to roles.mjs:', error);
        res.status(500).json({ message: 'Error updating role' });
    }
});

// Export the router
export default router;