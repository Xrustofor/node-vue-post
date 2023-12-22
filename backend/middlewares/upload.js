import util from "util";
import multer from "multer"
import crypto from "crypto"

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/webp"];
    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    const strList = file.mimetype.split('/');
    const typeImage = strList[strList.length - 1];
    let filename = `${crypto.randomUUID()}.${typeImage}`;
    // const isChanged = file.originalname.indexOf("changed-");
    // if(isChanged != -1){
    //   filename = file.originalname.split("changed-")[2]
    // }
    callback(null, filename);
  },
  fields: (() => {
    console.log('test-TEST');
  })
});

const uploadFiles = multer({ storage: storage }).array("image", 10);
const uploadFilesMiddleware = util.promisify(uploadFiles);


export default uploadFilesMiddleware;
