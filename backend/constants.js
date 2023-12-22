
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const CONSTANTS = {
    PATH_UPLOAD: join(`${__dirname}/../upload`),
}

export default CONSTANTS