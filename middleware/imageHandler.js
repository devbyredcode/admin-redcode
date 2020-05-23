const multer = require('multer');
const path = require('path');

const inputCaseStudy = multer.diskStorage({
    destination : "public/img/upload/case-study",
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const inputPlayground = multer.diskStorage({
    destination : "public/img/upload/playground",
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const inputStory = multer.diskStorage({
    destination : "public/img/upload/story",
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const inputOtherImage = multer.diskStorage({
    destination : "public/img/upload/other",
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadCaseStudy = multer({
    storage: inputCaseStudy,
    fileFilter : function(req, file, cb){
        imageValidation(file, cb);
    }
}).single("input_image");

const uploadStory = multer({
    storage : inputStory,
    filename : function(req, file, cb){
        imageValidation(file, cb);
    }
}).single("input_image");

const uploadPlayground = multer({
    storage : inputPlayground,
    filename : function(req, file, cb){
        imageValidation(file, cb);
    }
}).single("input_image");

const uploadOtherImage = multer({
    storage: inputOtherImage,
    fileFilter : function(req, file, cb){
        imageValidation(file, cb);
    }
}).single("input_image");

function imageValidation(file, cb) {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("ERROR: IMAGES ONLY");
    }
}

module.exports = { uploadCaseStudy, uploadStory, uploadPlayground, uploadOtherImage };