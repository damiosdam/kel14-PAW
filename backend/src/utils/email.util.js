const client = process.env.CLIENT_URL
exports.emailActivation = (token) => {
    return `
    <h1
    style="
        font-family: Arial, Helvetica, sans-serif;
        color: #000000;
        font-weight: bold;
        font-size: 24px;
        padding-top: 48px;
        padding-bottom: 32px;
        display: block;
        margin: 0;
    "
    >
    Verifikasi alamat email Anda agar dapat login pada website UKM Manage (SIM UKM
    UGM) dengan klik link di bawah
    </h1>

    <a
    href="${client}/verified?user=${token}"
    style="
        text-decoration: underline;
        display: inline-block;
        margin-bottom: 46px;
        font-size: 0;
    "
    >
    <p
        style="
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 16px;
        margin: 0;
        "
    >
        ${client}/verified?user=${token}
    </p>
    </a>
    `
}

exports.emailResetPassword = (token) => {
    return `
    <h1
    style="
        font-family: Arial, Helvetica, sans-serif;
        color: #000000;
        font-weight: bold;
        font-size: 24px;
        padding-top: 48px;
        padding-bottom: 32px;
        display: block;
        margin: 0;
    "
    >
    Lupa kata sandi? Klik link di bawah untuk mereset kata sandi Anda
    </h1>

    <a
    href="${client}/resetpassword/newpassword?user=${token}"
    style="
        text-decoration: underline;
        display: inline-block;
        text-align: center;
        margin-bottom: 46px;
        font-size: 0;
    "
    >
    <p
        style="
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        text-align: center;
        line-height: 16px;
        margin: 0;
        "
    >
        ${client}/resetpassword/newpassword?user=${token}
    </p>
    </a>
    `
}