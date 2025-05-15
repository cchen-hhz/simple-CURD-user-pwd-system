import express from 'express';
import * as databaseClient from './databse.js';

const app = express();
await databaseClient.connectToDatabase();

app.use(express.json());
app.use(express.static('pages'));

app.get('/', (req, res) => {
    res.redirect('intro.html');
});

app.get('/register', (req, res) => {
    res.redirect('register.html');
});

app.get('/login', (req, res) => {
    res.redirect('login.html');
});

app.get('/admintools', (req, res) => {
    res.redirect('admintools.html');
})

app.post('/register', async (req, res) => {
    console.log('Registering user');
    const user = req.body;
    let result = await databaseClient.createUser(user);
    if(result.status === 0) {
        console.log('User created successfully');
        res.status(200).send('Register Success');
    } else {
        res.status(400).send(result.message);
    }
});

app.post('/login', async (req, res) => {
    console.log('Authenticating user');
    const user = req.body;
    let result = await databaseClient.authentic(user);
    if(result.status === 0) {
        res.status(200).send('Login Success');
    } else {
        res.status(400).send(result.message);
    }
})

app.get('/debug_showall', async (req, res) => {
    const result = await databaseClient.getAllUsers();
    res.send(result);
})

app.delete('/delete_user', async (req, res) => {
    console.log("delete user");
    const username = req.body.username;
    const result = await databaseClient.deleteUser({name: username});
    console.log(result);
    res.send(result);
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

process.on('SIGINT', async () => {
    await databaseClient.quit();
    console.log("Client Bye Bye");
    process.exit(0);
});


