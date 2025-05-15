import { ClientEncryption, MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'mydatabase';

async function connectToDatabase() {
    try {
        await client.connect();
        console.log(`Connected to database: ${dbName}`);
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
    }
}
let db = await connectToDatabase();
const collectionName = 'users';
const collection = db.collection(collectionName);

async function createUser(user) {
    try {
        let result = await collection.findOne({name: user.name});
        if(result) {
            return {
                status: 1,
                message: 'User already exists'
            };
        }

        result = await collection.insertOne(user);
        return  {
            status: 0,
            message: 'User created successfully',
            data: result
        };
    } catch(error) {
        console.error(`Error creating user: ${error}`);
        return {
            status: 1,
            message: 'Error creating user'
        };
    }
}

async function authentic(user) {
    try {
        const result = await collection.findOne({name: user.name, password: user.password});
        if(result) {
            return {
                status: 0,
                message: 'User authenticated successfully',
            };
        } else {
            return {
                status: 1,
                message: 'Invalid username or password'
            };
        }
    } catch(error) {
        console.error(`Error authenticating user: ${error}`);
        return {
            status: 1,
            message: 'Error authenticating user'
        };
    }
}

async function deleteUser(user) {
    try {
        const result = await collection.deleteOne({name: user.name});
        if(result.deletedCount > 0) {
            return {
                status: 0,
                message: 'User deleted successfully'
            };
        } else {
            return {
                status: 1,
                message: 'User not found'
            };
        }
    } catch(error) {
        console.error(`Error deleting user: ${error}`);
        return {
            status: 1,
            message: 'Error deleting user'
        };
    }
}

async function getAllUsers() {
    try {
        const result = await collection.find({}).project({
            name: 1,
            password: 1,
            _id: 0
        }).toArray();
        console.log("Acquire all users");
        return {
            status: 0,
            message: 'Users retrieved successfully, See data below',
            data: result
        }
    } catch(error) {
        console.error(`Error getting all users: ${error}`);
        return {
            status: 1,
            message: 'Error getting all users'
        };
    }
}

async function quit() {
    await client.close();
    console.log("Mongo Bye Bye");
}

export {
    connectToDatabase,
    createUser,
    authentic,
    deleteUser,
    getAllUsers,
    quit
};