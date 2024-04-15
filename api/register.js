const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = process.env.MONGODB_URI;
const bcrypt = require('bcrypt');

const saltRounds = 10;
const client = new MongoClient(uri);




const register = async(userData) => {
    try {
        await client.connect();
        const database = client.db('users-db');
        const users = database.collection('users');
        if(await users.findOne({email : userData.email})){
            throw new Error(error);
        }else {
            bcrypt.hash(userData.password, saltRounds, function(err, hash) {
                 userData.password = hash;
                 users.insertOne(userData);
            });
            console.log('Successfully registered');
        }
        
    } catch(error){
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = { register};
