const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb+srv://dimas-aa:Himdimas123@cluster0.muk3gwu.mongodb.net/mongo?retryWrites=true&w=majority');

const start = async () => {
    try {
        await client.connect();
        console.log('CONNECT');
        await client.db().createCollection('users+');

        const users = client.db().collection('users+');
        await users.insertOne({name: 'Dmitrii', age: 34});

        const user = await users.findOne({age: 34});
        console.log(user);
    } catch (e) {
        console.log(e);
    } 
}

start();