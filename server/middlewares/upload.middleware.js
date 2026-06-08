const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("Only image files are allowed"), false);
    }
}
const upload = multer({
    storage,
    fileFilter,
    setLimits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    }

});

module.exports = upload;