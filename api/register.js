const {MongoClient, ServerApiVersion} = require('mongodb');
const uri ='mongodb+srv://anurpeljto:VLJNByurSnOlWiEZ@cluster0.khmo7tq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// VLJNByurSnOlWiEZ
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




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
