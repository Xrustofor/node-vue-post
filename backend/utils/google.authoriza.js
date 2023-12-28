import { google } from "googleapis";
import CONFIG from "../../env.config.js";
const SCOPE = ["https://www.googleapis.com/auth/drive"];


const authoriza = async () => {
    const jwtClient = new google.auth.JWT(
        CONFIG.CLIENT_EMAIL,
        null,
        CONFIG.PRIMARY_KEY,
        SCOPE
    );
    await jwtClient.authorize();
    
    return jwtClient;
  }

  export default authoriza