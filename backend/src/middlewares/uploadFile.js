const multer = require('multer')

const fileFilter = (req, file, cb) => {
    // reject a file
    if (
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.ms-excel' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true)
    } else {
        cb(new Error('File type not allowed'), false)
    }
}
exports.uploadFile = multer({
    storage: multer.memoryStorage({
        destination: function (req, file, cb) {
            cb(null, "");
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024, // no larger than 2mb
    },
    fileFilter
})