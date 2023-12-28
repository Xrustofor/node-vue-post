import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import morgan from "morgan"
// import bodyParser from "body-parser";


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

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(fileupload({}))

app.use(express.static('public', {
    extensions: ['htm', 'html'],
    index: false,
}));

app.use('/upload', express.static(join(__dirname, 'upload')));

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