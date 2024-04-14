const express = require('express');
const app = express();
const {register, checkIfExists} = require('./api/register');
const fs = require('fs').promises;
const path = require('path');
const PORT = process.env.PORT || 3000;


app.use(express.static('./public/web_project-newProject'));
app.use(express.json());

//mongodb



// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }

// routes

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public/web project-newProject'));
})

app.post('/register', async(req, res) => {
    const userData = req.body;
    await register(userData);
    res.redirect('GET /login');
});

app.get('/login', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public/web project-newProject', 'register.html'));
})

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