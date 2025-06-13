// controllers/userController.js
const mongoose = require("mongoose");
const User = require("../models/User");


//Get My Profile
const getMe= async ( req, res ) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
  });
}

// CREATE user
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    res.status(201).json({
      message: "User created",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE user
const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user by ID
const deleteUserById = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);

    if (!result) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createUser, updateUser, getMe,
  getAllUser, getUserById, deleteUserById,
};






// const { ObjectId } = require('mongodb');
// const { getDB } = require('../config/db');


// // CREATE user
// const createUser = async (req, res) => {
//   const db = getDB();
//   const { name, email } = req.body;

//   const result = await db.collection('users').insertOne({ name, email });
//   res.status(201).json({ message: 'User created', userId: result.insertedId });
// };

// // UPDATE user
// const updateUser = async (req, res) => {
//   const db = getDB();
//   const { id } = req.params;
//   const { name, email } = req.body;

//   const result = await db.collection('users').updateOne(
//     { _id: new ObjectId(id) },
//     { $set: { name, email } }
//   );

//   if (result.matchedCount === 0) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   res.json({ message: 'User updated successfully' });
// };


// const getAllUser=async (req,res) =>{
//     try{
//         const db=getDB();
//         const result=await db.collection('users').find().toArray();;
//         res.json({result});

//     } catch(err){
//         res.json({ error: err.message });
//     }
// }


// const getUserById=async (req,res) =>{
//     try{
//         const db=getDB();
//         const result=await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });

//         if(!result) return res.json({message:"user not found"});
//         res.json(result);

//     } catch(err){
//         res.json({ error: err.message });
//     }
// }



// const deleteUserById=async (req,res) =>{
//     try{
//         const db=getDB();
//         const result=await db.collection('users').deleteOne({_id:new ObjectId(req.params.id)});

//         if(result.deletedCount ==0){
//             return res.json({message:'User not found'});
//         }
//         res.json({message:"user deleted"});
//     } catch(err){
//         res.json({ error: err.message });
//     }
// }


// module.exports = { 
//     createUser, updateUser,
//     getAllUser, getUserById, deleteUserById
// };

