const express = require('express')
const router = express.Router()
const {
    ensureGuest,
} = require('../middlewares/auth.middleware');
// ? Desc:    Load Controllers
const {
    signupController,
    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController,
    logoutController,
    isLoggedIn
} = require('../controllers/auth.controller')

// ? Desc:    Load Validator
const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator,
    activationValidator,
} = require('../middlewares/validator.middleware')

router.post('/signup', ensureGuest, validSign, signupController);
router.post('/activation', activationValidator, activationController);
router.post('/signin', ensureGuest, validLogin, signinController);
router.get('/logout', logoutController);
router.get('/isLoggedIn', isLoggedIn);
router.post('/forgot-password', forgotPasswordValidator, forgotPasswordController);
router.put('/reset-password', resetPasswordValidator, resetPasswordController);

module.exports = router