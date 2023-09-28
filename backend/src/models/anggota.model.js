const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Enum untuk posisiAnggota
const posisiAnggotaEnum = ['Ketua', 'Sekretaris', 'Bendahara', 'Koordinator', 'Sub-Koordinator', 'Anggota'];

// Enum untuk statusAnggota
const statusAnggotaEnum = ['Aktif', 'Tidak Aktif'];

const AnggotaSchema = new Schema({
    nomorAnggota : {
        type: Number,
    },
    namaAnggota : {
        type: String,
    },    
    fakultasAnggota : {
        type: String,
    },
    prodiAnggota : {
        type: String,
    },
    nimAnggota : {
        type: String,
    },
    emailAnggota : {
        type: String,
    },
    posisiAnggota : {
        type: posisiAnggotaEnum
    },
    fotoAnggota : {
        type: Object
    },
    statusAnggota : {
        type: statusAnggotaEnum
    },
    nomorHpAnggota : {
        type: String
    },
    ttlAnggota : {
        type: String
    },
    asalAnggota : {
        type: String
    },
    periodeAnggota : {
        type: String
    }
},
    {
        timestamps: true
    }
);

const Anggota = mongoose.model('Anggota', AnggotaSchema);
module.exports = Anggota;