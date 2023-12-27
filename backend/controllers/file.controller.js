import { google } from "googleapis";
import crypto from "crypto"
import CONFIG from "../../env.config.js";
import fs from "fs";
import { Readable } from "stream";
import stream from "../utils/stream.js"

const SCOPE = ["https://www.googleapis.com/auth/drive"];



class FileController {
    async uploadFile(req, res, next) {
        // console.log(await authoriza())
        
        // console.log(req.files)
        // console.log();

        try{
            const files = req.files.image;
            
            if(Array.isArray(files)){
                console.log('Array')
            }else{
                
                // console.log(Readable.from(files));

                // files.mv('' + files.name);

            //     console.log(files);

            //     const test = await files.mv('').catch((e) => { console.log(e.message) });
            //     console.log(test);

               
            //    const fileName = createFileName(files.mimetype);
            //    let fileBuffer = files.data;
            //    fileBuffer.name = fileName;
            //    const data = stream.createReadStream(new Buffer(fileBuffer)).pipe();
            //    console.log(data);

               


            //    var file = 
            //    console.log({file})
            //    const file = fs.createReadStream('fox.jpeg');
            //    console.log(file)
            //    const jwtClient = await authoriza();
            //    const res = await uploadFile(jwtClient, fileBuffer, fileName).catch((err) => { console.log(err.message) })
            //    console.log(res)

                // const res = await authoriza().then(uploadFile).catch((err) => { console.log(err.message) })
                // console.log({res})

            }


        }catch(e){
            return res.status(500).json({
                success: false,
                message: "Upload error"
            })
        }
        

        next();
    }
}



async function uploadFile(authClient, file, fileName){
    console.log("Upload Started...")
    return new Promise( async (resolve, reject) => {
        const drive = google.drive({version: "v3", auth: authClient});
        let fileMetaData = {
            name: fileName,
            parents: ["1YXpQqCCLRb6EFwWo4LJ8Aq6TwhZ4h5kl"]
        }


        drive.files.create({
            resource: fileMetaData,
            media: {
                body: file,
                mimeType: 'image/jpeg'
            },
            fields: 'id'
        }, function(err, file) {
            if(err){ return reject(err)};
            console.log("Upload")
            resolve(file);
        })
    })
    
}

async function authoriza() {
    const jwtClient = new google.auth.JWT(
        CONFIG.CLIENT_EMAIL,
        null,
        CONFIG.PRIMARY_KEY,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}


function createFileName(mimetype){
    const strList = mimetype.split('/');
    const typeImage = strList[strList.length - 1];
    return `${crypto.randomUUID()}.${typeImage}`;
}




export default new FileController();