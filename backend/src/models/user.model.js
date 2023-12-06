const mongoose = require("mongoose");
const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
        },
        name: {
            type: String,
            trim: true,
        },
        foto: {
            type: Object,
        },
        phone: {
            type: String,
        },
        hashed_password: {
            type: String,
            // required: true
        },
        salt: String,
        role: {
            type: String,
            default: "ketua",
        },
        resetPasswordLink: {
            data: String,
            default: "string",
        },
        verified: Boolean,
        requiredRepair: Boolean,
    },
    {
        timestamps: true,
    }
);

// virtual for hashing password
userScheama
    .virtual("password")
    .set(function (password) {
        _password = this.password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

// methods for hashing password
userScheama.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
        } catch (err) {
            return "";
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
};

module.exports = mongoose.model("User", userScheama);
