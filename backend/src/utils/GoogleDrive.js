const { google } = require('googleapis');
const OAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
)
OAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
const drive = google.drive({
    version: 'v3',
    auth: OAuth2Client
})

module.exports = {OAuth2Client, drive}