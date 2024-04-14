const fs = require('fs').promises;

// const register = async (userData) => {
//     try {
//         // await fs.writeFile('users.json', JSON.stringify(userData), {flag:'a'});
//         const file = await fs.readFile('users.json');
//         const users = JSON.parse(file);

//         users.users.push(userData);
//         await fs.writeFile('users.json', JSON.stringify(users, null, 2));
//         console.log('Write successful');
//     } catch (error) {
//         throw error;
//     }
// };

// const checkIfExists = async (userData) => {
//     try {
//         const fileData = await fs.readFile('users.json');
//         const usersObj = JSON.parse(fileData);
//         const usersArr = usersObj.users;
        
//         const existingUser = usersArr.find(user => user.email == userData.email);
        
//         if(existingUser){
//             return true
//         }
//         else {
//             return false
//         }
        
//     } catch (error) {
//         throw error;
//     }
// };

const register = async(users, userData) => {
    try{
        const existingUser = await users.findOne({email: userData.email});
        if(existingUser){
            throw new Error('User already exists');
        }
        
        await users.insertOne(userData);
        console.log('successful write');
    } catch(error){
        throw error;
    }
}

module.exports = { register};
