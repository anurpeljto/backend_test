const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = process.env.MONGODB_URI;

// VLJNByurSnOlWiEZ
const client = new MongoClient(uri);




const register = async(userData) => {
    try {
        const database = client.db('users-db');
        const users = database.collection('users');
        if(await users.findOne({email : userData.email})){
            throw new Error(error);
        }else {
            await users.insertOne(userData);
            console.log('Successfully registered');
        }
        
    } catch(error){
        throw error;
    }
}

module.exports = { register};
