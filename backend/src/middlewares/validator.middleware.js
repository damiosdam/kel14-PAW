const { check, validationResult } = require('express-validator');
exports.validSign = [
    check('email', 'Email diperlukan').notEmpty(),
    check('email')
        .isEmail()
        .withMessage('Harus alamat e-mail yang valid'),
    check('password', 'Kata sandi dibutuhkan').notEmpty(),
    check('password')
        .isLength({ min: 8 }).withMessage('Panjang kata sandi minimal harus 8 karakter')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z-_!@#$%^&*]{8,}$/, "i").withMessage('Kata sandi harus berisi setidaknya 1 huruf besar, 1 huruf kecil, dan 1 angka'),
    check("confirmPassword")
        .notEmpty().withMessage("Konfirmasi kata sandi tidak boleh kosong")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Kata sandi konfirmasi tidak cocok dengan kata sandi')
            }
            return true;
        }),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                error: true,
                message: error.array()
            });
        }
        return next();
    }
]

exports.validLogin = [
    check('email', "Email diperlukan")
        .notEmpty()
        .isEmail()
        .withMessage('Harus alamat e-mail yang valid'),
    check('password', 'Kata sandi dibutuhkan')
        .notEmpty(),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                error: true,
                message: error.array()
            });
        }
        return next();
    }
]

exports.forgotPasswordValidator = [
    check('email', "Email diperlukan")
        .notEmpty()
        .isEmail()
        .withMessage('Harus alamat e-mail yang valid'),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                error: true,
                message: error.array()
            });
        }
        return next();
    }
]

exports.activationValidator = [
    check('token', "Token dibutuhkan")
        .notEmpty(),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                error: true,
                message: error.array()
            });
        }
        return next();
    }
]

exports.resetPasswordValidator = [
    check('resetPasswordLink', 'Tautan setel ulang kata sandi diperlukan')
        .notEmpty(),
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage('Panjang kata sandi minimal harus 8 karakter')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z-_!@#$%^&*]{8,}$/, "i").withMessage('Kata sandi harus berisi setidaknya 1 huruf besar, 1 huruf kecil, dan 1 angka'),
    check("confirmPassword", "Konfirmasi kata sandi tidak boleh kosong")
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Kata sandi konfirmasi tidak cocok dengan kata sandi')
            }
            return true;
        }),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                error: true,
                message: error.array()
            });
        }
        return next();
    }
]