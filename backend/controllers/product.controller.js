import { validationResult } from "express-validator";
import fs from "fs";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Product from "../../backend/models/product.module.js";
import Image from "../../backend/models/attachment.module.js";
import db, { openConnection, closeConnection } from '../../backend/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload_url = join(__dirname, '../../', 'upload')


import CONFIG from "../../env.config.js";

class ProductController {
    async createProduct(req, res) {
        const {title, description, price } = req.body;
        try{

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            await db.transaction(async () => {
                const product = await new Product({title, description, price});
                await product.save();
                const files = req.files.map(f => ({
                    mimetype: f.mimetype,
                    filename: f.filename,
                    product_id: product.id,
                    size: f.size,
                }))
                await Image.bulkCreate(files);
             })
            


            res.status(201).json({success: true});

        }catch(err) {
            console.log(err.message);
            res.status(401).json({success: false, error: err.message});
        }
        
    }

    async updateProduct(req, res) {
        const {title, description, price, remove } = req.body;
        const { id } = req.params;

        try{
            await db.transaction( async () => {
                const product = await Product.findByPk(id);
                product.update({title, description, price});
                product.save();

                const files = [];
                const changedFiles = [];

                req.files.forEach(f => {
                    const isChanged = f.originalname.indexOf("changed-");
                    if(isChanged === -1){
                        files.push({
                            mimetype: f.mimetype,
                            filename: f.filename,
                            product_id: product.id,
                            size: f.size,
                        })
                    }else{
                        const nameArray = f.originalname.split("changed-");
                        const fileId = nameArray[0];
                        changedFiles.push({
                            id: +fileId,
                            mimetype: f.mimetype,
                            filename: f.filename,
                            product_id: product.id,
                            size: f.size,
                        })
                    }
                });


                if(changedFiles.length){
                    const idArray = changedFiles.map(f => ({id: +f.id}));
                    const files = changedFiles.map(f => ({
                        mimetype: f.mimetype,
                        filename: f.filename,
                        product_id: product.id,
                        size: f.size,
                    }))

                    const images = await Image.findAll({ where: idArray });
                    await deleteFile(images);

                    await Image.update(...files, {
                        where: idArray
                    });
                }
    
                if(files.length){
                    await Image.bulkCreate(files);
                }
    
                if(!Array.isArray(remove)) return;

                const images = await Image.findAll({
                    where: { id: remove }
                });
                await deleteFile(images);
    
                await Image.destroy({
                    where: { id: remove }
                });
                
            })

            res.status(201).json({success: true});
    
        }catch(e){
            res.status(401).json({success: false, error: e.message});
            console.log(e.message)
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try{
            await db.transaction(async () => {
                const product = await Product.findByPk(id);

                const images = await Image.findAll({
                    where: { product_id: product.id },
                    attributes: ['filename']
                })

                await deleteFile(images);

                await Image.destroy({
                    where: { product_id: id }
                });

                product.destroy();
               
                res.status(201).json({success: true});
            })
            
        }catch(e){
            console.log(e.message);
            res.status(401).json({success: false});
        }   
    }

    async getProducts(req, res) {
        const { page } = req.query;
        let limit = 3;
        let offset = 0 + (+page - 1) * limit;
        let pages = 0;
        try{

            const count = await Product.count();
           
            const products = await Product.findAndCountAll({
                offset: offset,
                limit: limit,
                order: [['updatedAt', 'DESC']],
                include: [{
                  model: Image,
                  required: false,
                  association: 'images',
                }]
            }).then( res => {
 
                pages = Math.ceil(count / limit) || 1;
                
                res.rows = res.rows.map(item => {
                    item.images = item.images.map(img => {
                        img.dataValues.url = `${CONFIG.PATH}/upload/${img.filename}`; 
                        return img;
                    })
                    return item;
                })
                return {
                    meta: {
                        count: res.count,
                        limit,
                        offset,
                        pages
                    },                    
                    items: res.rows
                };
            } )
            res.status(201).json(products);
           
        }catch(e){
            res.status(401).json({success: false, error: e.message});
        }
    }

    async getByProduct(req, res) {
        const { id } = req.params;
        try{
            const product = await Product.findOne({
                where: {id},
                include: [{
                    model: Image,
                    required: false,
                    association: 'images',
                  }]
            }).then( res => {
                res.images = res.images.map(img => {
                    img.dataValues.url = `${CONFIG.PATH}/upload/${img.filename}`; 
                    return img;
                })
                return res;
            })

            res.status(201).json(product);

        }catch(e){ 
            console.log(e.message);
            res.status(401).json({success: false, error: e.message});
        }

        
    }
}

export default new ProductController();


async function deleteFile(images = []) {
    await images.forEach( async (image) => {
        await fs.unlink(
            join(upload_url, image.dataValues.filename),
            async (err) => {
                if(err) throw err;
                console.log(`File ${image.dataValues.filename} deleted!`);
            }
        )
    })
}