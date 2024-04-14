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
        if(user.email === userData.email && user.password === userData.password){
            console.log('Successful login');
            return user;
        } else {
            throw new Error('Invalid username or password');
        }
    } catch(error){
        throw Error(`${error.message}`);
    } finally {
        await client.close();
    }
}

module.exports = {login};