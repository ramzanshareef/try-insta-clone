const multer = require("multer");
const fs = require("fs");

const createStorage = (path) => {
    const folderPath = `./uploads/${path}`;
    fs.mkdirSync(folderPath, { recursive: true });
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + " - " + file.originalname);
        }
    });
} // 1. Create a storage for user posts

const uploadImage = (storagePath) => {
    return multer({
        storage: storagePath,
        limits: {
            fileSize: 1024 * 1024 * 10,
        },
    }).single("photo")
} // 2. Upload image

module.exports = {
    uploadImage,
    createStorage
}