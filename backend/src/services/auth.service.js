const jwt = require("jsonwebtoken");

exports.generateActivationToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_ACCOUNT_ACTIVATION || "secret", { expiresIn: "1h", });
}
exports.generateLoginToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET || "secret", { expiresIn: "6h" });
}
exports.generateResetPasswordToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_RESET_PASSWORD || "secret", { expiresIn: "1h" });
}
exports.verifyActivationToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION || "secret");
}