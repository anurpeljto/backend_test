const MongoClient = require('mongodb');
const uri = process.env.MONGODB_URI;

const login = async(userData) => {
    try {
        const client = new MongoClient(uri);
        const database = client.db('users-db');
        const users = client.collection('users');
        const userJson = JSON.parse(userData);
        const user = await users.findOne({email: userJson.email});

        if(!user){
            throw new Error('User not registered');
        }
        if(user.email == userJson.email && user.password == userData.password){
            console.log('Successful login');

        }
    } catch(Error){
        throw Error;
    }
}

module.exports = {login};