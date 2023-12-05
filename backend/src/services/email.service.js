const nodemailer = require("nodemailer");
const { emailActivation, emailResetPassword } = require("../utils/email.util")
// matiin firewall sama antivirus, biasanya port nya ke block mereka
let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    service: "zoho",
    port: 465,
    secure: true,
    auth: {
        type: 'login',
        user: "no-reply@technocorner.id", // menggunakan zoho yang sudah ada milik technocorner.id karena nomor handphone maulana anjari tertaut di akun itu tidak bisa daftar akun lain
        pass: "ZQnXBaPLEQaf"
    },
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
    },
    // for debugging
    // debug: true, // show debug output
    // logger: true, // log information in console
});
transporter.verify((error, success) => {
    if (error) {
        console.log("Transporter", error);
    } else {
        console.log("Ready to send email", success);
    }
});

exports.sendActivationEmail = async (email, token) => {
    const activationMailOptions = {
        from: `SIM UKM UGM <no-reply@technocorner.id>`,
        to: email,
        subject: "Activate your account",
        html: emailActivation(token)
    };
    try {
        const response = await transporter.sendMail(activationMailOptions)
        return {
            status: response.response,
            response,
            message: `Verification email has been sent to ${email}`,
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        }
    }
}
exports.sendResetPasswordEmail = (email, token) => {
    const resetMailOptions = {
        from: `SIM UKM UGM <no-reply@technocorner.id>`,
        to: email,
        subject: `Password Reset Link`,
        html: emailResetPassword(token)
    };
    try {
        const response = transporter.sendMail(resetMailOptions)
        return {
            status: response.response,
            response,
            message: `Reset password email has been sent to ${email}`,
        }
    } catch (e) {
        return {
            status: 500,
            message: err.message,
        }
    }
}