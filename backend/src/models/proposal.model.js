const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProposalSchema = new Schema({
    namaKegiatan: {
        type: String
    },
    tempat: {
        type: String
    },
    waktuKegiatan: {
        type: String,
        validate: {
            validator: function (v) {
                return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            },
            message: props => `${props.value} format time adalah Jam:Menit`
        }
    },
    jumlahMahasiswaTerlibat: {
        type: Number
    },
    jumlahDosenTerlibat: {
        type: Number
    },
    biayaYangDiajukan: {
        type: Number
    },
    biayaYangDigunakan: {
        type: Number
    },
    narahubung: {
        type: String
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
