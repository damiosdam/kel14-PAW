const { drive } = require("../utils/GoogleDrive");
const path = require("path");
const stream = require("stream");

exports.deleteFile = async (fileId) => {
    if (fileId !== undefined || fileId !== null || fileId !== '') {
        await drive.files.delete({
            fileId: fileId
        })
    }
}

exports.uploadFileToGdrive = async (filesLeader) => {
    let foto, proposal, lpj, surat, namaFile;
    let files = [];
    const fileKeys = Object.keys(filesLeader);
    if (fileKeys.length == 1) {
        files.push(filesLeader[fileKeys[0]][0])
    } else {
        fileKeys.forEach(function (key) {
            files.push(filesLeader[key][0]);
        });
    }
    for (let file of files) {
        const originalFileName = file.originalname
        let bufferStream = new stream.PassThrough()
        bufferStream.end(file.buffer)
        let parents
        if (file.fieldname === 'foto') {
            parents = [process.env.URI_GDRIVE_FOTO]
            namaFile = "Foto"
        } else if (file.fieldname === 'proposal') {
            parents = [process.env.URI_GDRIVE_PROPOSAL]
            namaFile = "Proposal"
        } else if (file.fieldname === 'lpj') {
            parents = [process.env.URI_GDRIVE_LPJ]
            namaFile = "LPJ"
        } else {
            parents = [process.env.URI_GDRIVE_SURAT]
            namaFile = "Surat"
        }
        const response = await drive.files.create({
            media: {
                mimeType: 'image/jpeg' || 'image/jpg' || 'image/png' || 'application/msword' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 'application/pdf',
                body: bufferStream
            },
            resource: {
                name: namaFile + "-" + Date.now() + path.extname(file.originalname),
                parents: parents
            },
            fields: 'id',
        })
        const fileId = response.data.id
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId,
            fields: 'webViewLink, webContentLink'
        })
        const downloadLink = result.data.webContentLink
        const viewLink = result.data.webViewLink
        const exportLink = "https://drive.google.com/uc?export=view&id=" + fileId
        if (file.fieldname === 'foto') {
            foto = { originalFileName, exportLink, downloadLink, viewLink, fileId }
        } else if (file.fieldname === 'proposal') {
            proposal = { originalFileName, exportLink, downloadLink, viewLink, fileId }
        } else if (file.fieldname === 'lpj') {
            lpj = { originalFileName, exportLink, downloadLink, viewLink, fileId }
        } else {
            surat = { originalFileName, exportLink, downloadLink, viewLink, fileId }
        }
    }
    return { foto, proposal, lpj, surat }
}