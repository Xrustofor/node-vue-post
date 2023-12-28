import { google } from "googleapis";
import crypto from "crypto";
import { Readable } from "stream";
import CONFIG from "../../env.config.js";
import authoriza from "../../backend/utils/google.authoriza.js"


const googleUploadFiles = async (req, res, next) => {
  const files = [];
  try{
    const images = req.files.image;

    if(Array.isArray(images)){
        console.log('Array')
    }else{
      const file = {
        size: images.size,
        mimetype: images.mimetype
      }
      const res = await uploadFile(images);
      if(res.status === 200){
        file.uuid = res.data.id;
        files.push(file);
      }
    }
    req.files = files;
    next();

  }catch(e){
      console.log(e);
      return res.status(500).json({
        success: false,
        message: "Upload error",
        errors: [e.message]
    })
  }
}

async function uploadFile(file){
  console.log("Upload Started...")
  const fileName = createName(file.mimetype);
  const mimetype = file.mimetype;
  const authClient = await authoriza();

  return new Promise( async (resolve, reject) => {
      const drive = google.drive({version: "v3", auth: authClient});
      let fileMetaData = {
          name: fileName,
          parents: [CONFIG.FOLDER_ID]
      }

      drive.files.create({
          resource: fileMetaData,
          media: {
              body: bufferToStream(file.data),
              mimeType: mimetype
          },
          fields: 'id'
      }, function(err, file) {
          if(err){ return reject(err)};
          console.log("Upload")
          resolve(file);
      })
  })
}

function bufferToStream(binary) {
  return new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });
}

function createName(mimetype){
  const strList = mimetype.split('/');
  const typeImage = strList[strList.length - 1];
  return `${crypto.randomUUID()}.${typeImage}`;
}



export default googleUploadFiles;