
const express = require('express');
const router = express.Router();
const { createUser, updateUser , getAllUser , getUserById,
     deleteUserById, getMe  } = require('../controllers/userController');


const { protect } = require('../middleware/authMiddleware');


// Create a new user
router.post('/', createUser);
router.get('/', protect, getAllUser);
router.get('/me', protect, getMe);

router.get('/:id', protect, getUserById);
router.patch('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUserById);


module.exports = router;
