const User = require("../models/user.model");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const ErrorHandler = require("../utils/error-handler");
const {
    sendActivationEmail,
    sendResetPasswordEmail
} = require("../services/email.service");
const {
    generateActivationToken,
    generateLoginToken,
    generateResetPasswordToken,
    verifyActivationToken
} = require("../services/auth.service");

exports.signupController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            const error = new ErrorHandler(401, "Email sudah digunakan");
            return next(error);
        } else {
            // genti isi token sesuai permintaan halaman registrasi user
            const user = await User.create({ email, password, verified: false });
            const token = generateActivationToken(user._id)
            const result = await sendActivationEmail(email, token);
            res.status(200).json({
                error: false,
                message: result.message
            });
        }
    } catch (error) {
        return next(error);
    }
};

exports.activationController = async (req, res, next) => {
    const { token } = req.body;
    try {
        const { _id } = verifyActivationToken(token);
        const user = await User.findById(_id);
        user.verified = true;
        user.save();
        return res.status(201).json({
            error: false,
            message: "Signup success",
        });
    } catch (error) {
        return next(error);
    }
};

exports.signinController = async (req, res, next) => {
    const { email, password } = req.body;
    // check if user exist
    const user = await User.findOne({ email })
    if (!user) {
        const error = new ErrorHandler(400, "Pengguna dengan email tersebut tidak ditemukan. Silakan mendaftar dahulu");
        return next(error);
    }
    // authenticate
    if (!user.authenticate(password)) {
        const error = new ErrorHandler(400, "Email dan password tidak cocok");
        return next(error);
    }
    if (user.verified == false) {
        const error = new ErrorHandler(400, "Email belum terverifikasi");
        return next(error);
    }
    // generate a token and send to client
    const token = generateLoginToken(user._id);
    user.hashed_password = undefined;
    user.salt = undefined;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 21600000),
        sameSite: 'none',
        secure: true,
        // credentials: "same-origin"
    })
    return res.status(200).json({
        error: false,
        message: "Berhasil login",
        token,
        user
    });
};

exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET || "secret");
        res.json(true);
    } catch (error) {
        res.json(false);
    }
};

exports.logoutController = async (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true,
    }).send("logged out");
}

exports.forgotPasswordController = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        const error = new ErrorHandler(400, "User with that email does not exist");
        return next(error);
    }
    try {
        const token = generateResetPasswordToken(user._id);
        await user.updateOne({ resetPasswordLink: token });
        const result = sendResetPasswordEmail(email, token);
        res.status(200).json({
            error: false,
            message: result.message
        });
    } catch (error) {
        return next(error);
    }
};

exports.resetPasswordController = (req, res, next) => {
    const { resetPasswordLink, newPassword } = req.body;
    try {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err, decoded) {
            if (err) {
                const error = new ErrorHandler(400, "Expired link. Try again");
                return next(error);
            }
            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    const error = new ErrorHandler(400, "Password reset token is wrong");
                    return next(error);
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: "",
                };
                user = _.extend(user, updatedFields);
                user.save();
                res.status(200).json({
                    error: false,
                    message: "Berhasil mengubah password, sekarang Anda bisa login dengan password baru",
                });
            });
        });
    } catch (error) {
        return next(error);
    }
};

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET || "secret",
    algorithms: ["HS256"],
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            return req.headers.authorization.split(" ")[1];
        } else if (req.cookies && req.cookies.AuthToken) {
            return req.cookies.AuthToken;
        } else if (req.query && req.query.AuthToken) {
            return req.query.AuthToken;
        } else return null;
    },
});