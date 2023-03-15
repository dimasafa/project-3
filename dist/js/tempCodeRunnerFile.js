    const {MongoClient} = require('mongodb');
    const client = new MongoClient('mongodb+srv://dimas-aa:Himdimas123@cluster0.muk3gwu.mongodb.net/mongo?retryWrites=true&w=majority');
    const start = async () => {
        try {
            
            await client.connect();
            console.log('CONNECT');
    /*         await client.db().createCollection('users_WD'); */
            

            const users = client.db().collection('users_WD');

            const form = document.querySelector('form');
            const formData = new FormData(form);
            const data = {};
            
            for (const [key, value] of formData.entries()) {
            data[key] = value;
            }
            

            await users.insertOne(data);

    /*         const user = await users.findOne({age: 34}); */
            console.log(users);
        } catch (e) {
            console.log(e);
        } 
    }

    start();