const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const router = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/api', cors(), router);



async function start() {
    try {
        await sequelize.authenticate()
        console.log('Database connection established successfully')
    } catch (e) {
        console.log('Unable to connect to database: ', e.message);
        return;
    }

    try{
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    }catch (e){
        console.log(e)
    }
}

start();