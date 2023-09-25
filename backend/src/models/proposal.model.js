const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProposalSchema = new Schema({
    namaKegiatan: {
        type: String,
        required: [true, 'Nama kegiatan diperlukan']
    },
    tempat: {
        type: String,
        required: [true, 'Tempat kegiatan diperlukan']
    },
    waktuKegiatan: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} format time adalah Jam:Menit`
        },
        required: [true, 'Waktu kegiatan diperlukan']
    },
    jumlahMahasiswaTerlibat: {
        type: Number,
        required: [true, 'Jumlah mahasiswa terlibat diperlukan']
    },
    jumlahDosenTerlibat: {
        type: Number,
        required: [true, 'Jumlah dosen terlibat diperlukan']
    },
    biayaYangDiajukan: {
        type: Number,
        required: [true, 'Biaya yang diajukan diperlukan']
    },
    biayaYangDigunakan: {
        type: Number,
        required: [true, 'Biaya yang digunakan diperlukan']
    },
    narahubung: {
        type: String,
        required: [true, 'Narahubung diperlukan']
    },
    proposalFile: {
        type: Object,
    }
},
{
    timestamps: true
});

const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal;
