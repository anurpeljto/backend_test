const {MongoClient} = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');

const login = async(userData) => {
    try {
        await client.connect();
        const database = client.db('users-db');
        const users = database.collection('users');
        const user = await users.findOne({email: userData.email});

        if(!user){
            throw new Error('User not registered');
        }
        if(user.email === userData.email && bcrypt.compare(userData.password, user.password)){
            console.log('Successful login');
            return user;
        } else {
            throw new Error('Invalid username or password');
        }
    } finally {
        await client.close();
    }
}

module.exports = {login};