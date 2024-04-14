const express = require('express');
const app = express();
const {register, checkIfExists} = require('./api/register');
const fs = require('fs').promises;
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('./public/web_project-newProject'));
app.use(express.json());

// routes

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public/web project-newProject'));
})

app.post('/register', async(req, res) => {
    try {
        const userData = req.body;

        if(!userData){
            return res.status(400).send('Error, invalid data');
        }
        console.log(userData);
        const exists = await checkIfExists(userData);
        if(exists == true){
            console.log('Already exists');
            return res.status(400).send('User already registered');
        }

        await register(userData);
        console.log('redirecting to homepage');
        res.redirect('/');
    } catch (error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

app.post('/login', async(req,res) => {
    try{
        const userData = req.body;
        // const exists = await checkIfExists(userData);

        // if(exists == false){
        //     console.log('User found in database');
        // }

        const localData = await fs.readFile('users.json');
        const localDataObj = JSON.parse(localData);
        const usersArray = localDataObj.users;

        const findPw = usersArray.find(user => user.email == userData.email);

        if(findPw.password == userData.password){
            return res.redirect('/');
        }
        else {
            return res.status(201).send('Works & pw incorrect');
        }
        
    } catch (error){
        console.error(error);
    }
})

app.get('*', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public/web_project-newProject', 'index.html'));
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})