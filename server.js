const express = require('express');
const connectDB = require('./config/connectDB');
require('dotenv').config({path: './config/.env'});
const User = require('./models/User')

const app = express();
app.use(express.json());
connectDB();
const PORT = process.env.PORT || 5000

//ADD A NEW USER TO THE DATABASE
app.post('/users/add', async(req,res) => {
    const {name, email, age, phone} = req.body;
    const newUser = new User({name , email, age, phone})
    try {
        await newUser.save();
        res.send(newUser)
    } catch (error) {
        res.send({error: error.message})
    }
})

// RETURN ALL USERS 
app.get('/users/get', async(req,res) =>{
    try {
        const users = await User.find();
        res.send(users)
    } catch (error) {
        res.send({error : error.message})
    }
})

//EDIT A USER BY ID 
app.put('/users/update/:id', async(req,res) =>{
    try {
        const editedUser = await User.findByIdAndUpdate(req.params.id, {...req.body},{new: true});
        res.send(editedUser);
    } catch (error) {
        res.send({error: error.messages})
    }
})

//REMOVE A USER BY ID 
app.delete('/users/delete/:id', async(req,res) =>{
    try {
        const userDel = await User.findByIdAndDelete(req.params.id);
        res.send('user successfully deleted')
    } catch (error) {
        res.send({error: error.message})
    }
})

app.listen(PORT, (err) => err ? console.log(err) : console.log(`server running on port ${PORT}`))