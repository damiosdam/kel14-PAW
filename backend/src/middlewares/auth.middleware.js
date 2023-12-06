require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
    ensureAuth: (req, res, next) => {
        let getToken = function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
                return req.headers.authorization.split(" ")[1];
            } else if (req.cookies && req.cookies.token) {
                return req.cookies.token;
            } else if (req.query && req.query.token) {
                return req.query.token;
            } else return null;
        };
        const token = getToken(req);
        try {
            const credential = jwt.verify(token, process.env.JWT_SECRET || "secret");
            if (!credential) {
                return res.status(400).send({
                    error: "Invalid token",
                });
            }
            User.findById({ _id: credential._id }).select('_id')
                .exec((err, user) => {
                    if (err || !user) {
                        return res.status(400).send({
                            error: "User not found",
                        });
                    }
                    req.user = user;
                    return next();
                });
        } catch (error) {
            return res.send(error);
        }
    },

    ensureGuest: function (req, res, next) {
        if (req.headers.authorization) {
            return res.status(406).send({ error: "User authorized" });
        } else {
            next();
        }
    },
}