import util from "util";
import multer from "multer"
import crypto from "crypto"



const googleUploadFiles = (req, res, next) => {
    console.log('Request Type:', req)
    next()
  }



export default googleUploadFiles;