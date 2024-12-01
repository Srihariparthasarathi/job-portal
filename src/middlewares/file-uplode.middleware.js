// OM NAMASIVAYA
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/resume')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix  + '-' +  file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    const filetypes = /pdf|doc|docx/;
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype){
        return cb(null, true);
    } else {
        // return cb(null, false);
        return cb(new Error('Only .pdf, .doc and .docx format allowed!'));
    }
}
  


function uploadPdf(req, res, next) {
    const upload = multer({ storage: storage,
        fileFilter: fileFilter
    }).single("cv")

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send({errors: [{
                msg: err.message
            }]})
        } else if (err) {
            return res.status(400).send({errors: [{
                msg: err.message
            }]})
        }
        next()
    })
}

export { uploadPdf }