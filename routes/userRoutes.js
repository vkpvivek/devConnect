
const express = require('express');
const router = express.Router();
const { createUser, updateUser , getAllUser , getUserById,
     deleteUserById } = require('../controllers/userController');

// Create a new user
router.post('/', createUser);
router.get('/', getAllUser);

router.get('/:id',getUserById)
router.patch('/:id', updateUser);
router.delete('/:id',deleteUserById);


module.exports = router;
