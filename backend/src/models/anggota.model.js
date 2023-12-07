const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnggotaSchema = new Schema({
    namaAnggota : {
        type: String,
        required: [true, 'Tolong isi Nama Anggota!'] 
    },    
    fakultasAnggota : {
        type: String,
        required: [true, 'Tolong isi Fakultas Anggota!']
    },
    prodiAnggota : {
        type: String,
        required: [true, 'Tolong isi Prodi Anggota!']
    },
    nimAnggota : {
        type: String,
        required: [true, 'Tolong isi NIM Anggota!'],
        unique: true,
    },
    emailAnggota : {
        type: String,
        required: [true, 'Tolong isi Email Anggota!'],
        unique: true,
    },
    posisiAnggota : {
        type: String,
        required: [true, 'Tolong isi Posisi Anggota!']
    },
    foto : {
        type: Object,
        required: [true, 'Tolong isi Foto Anggota!']
    },
    statusAnggota : {
        type: String,
        required: [true, 'Tolong isi Status Anggota!']
    },
    nomorHpAnggota : {
        type: String,
        required: [true, 'Tolong isi Nomor HP Anggota!'],
        unique: true,
    },
    ttlAnggota : {
        type: String,
        required: [true, 'Tolong isi TTL Anggota!']
    },
    asalAnggota : {
        type: String,
        required: [true, 'Tolong isi Asal Anggota!']
    },
    periodeAnggota : {
        type: String,
        required: [true, 'Tolong isi Periode Anggota!']
    }
},
    {
        timestamps: true
    }
);

const Anggota = mongoose.model('Anggota', AnggotaSchema);
module.exports = Anggota;
