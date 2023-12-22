import express from "express";
import cors from "cors";

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import CONFIG from "./env.config.js";
import db, { openConnection, closeConnection } from './backend/db.js';
import router from "./backend/routes/index.js"

import Product from "./backend/models/product.module.js";
import Image from "./backend/models/attachment.module.js";

const PORT = CONFIG.PORT;

const app = express();

app.use(express.static('public', {
    extensions: ['htm', 'html'],
    index: false,
}));
console.log('index.js __dirname: ', join(__dirname));
console.log('index.js upload_url: ', join(__dirname, 'upload'));

app.use('/upload', express.static(join(__dirname, 'upload')));


app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/api', cors(), router);

app.get('*', cors(), (req,res) => {
    res.status(200)
    res.sendFile(join(__dirname, 'public', 'index.html'))
})


async function bootstrap() {
    try{
        await openConnection();
        Product.sync();
        Image.sync();

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })

    }catch(e) {
        console.log(e.message)
    }
}

bootstrap();