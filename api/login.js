const {MongoClient} = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const login = async(userData) => {
    try {
        
        const database = client.db('users-db');
        const users = database.collection('users');
        const user = await users.findOne({email: userData.email});

        if(!user){
            throw new Error('User not registered');
        }
        if(user.email == userData.email && user.password == userData.password){
            console.log('Successful login');

        }
    } catch(Error){
        throw Error;
    }
}

module.exports = {login};