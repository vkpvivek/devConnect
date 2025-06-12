const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');


// CREATE user
const createUser = async (req, res) => {
  const db = getDB();
  const { name, email } = req.body;

  const result = await db.collection('users').insertOne({ name, email });
  res.status(201).json({ message: 'User created', userId: result.insertedId });
};

// UPDATE user
const updateUser = async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const { name, email } = req.body;

  const result = await db.collection('users').updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, email } }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User updated successfully' });
};


const getAllUser=async (req,res) =>{
    try{
        const db=getDB();
        const result=await db.collection('users').find().toArray();;
        res.json({result});

    } catch(err){
        res.json({ error: err.message });
    }
}


const getUserById=async (req,res) =>{
    try{
        const db=getDB();
        const result=await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });

        if(!result) return res.json({message:"user not found"});
        res.json(result);

    } catch(err){
        res.json({ error: err.message });
    }
}



const deleteUserById=async (req,res) =>{
    try{
        const db=getDB();
        const result=await db.collection('users').deleteOne({_id:new ObjectId(req.params.id)});

        if(result.deletedCount ==0){
            return res.json({message:'User not found'});
        }
        res.json({message:"user deleted"});
    } catch(err){
        res.json({ error: err.message });
    }
}


module.exports = { 
    createUser, updateUser,
    getAllUser, getUserById, deleteUserById
};
