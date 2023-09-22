const mongoose = require('mongoose')
const Schema = mongoose.Schema
const InventarisSchema = new Schema({
    namaBarang: {
        type: String,
        required: [true, 'Nama barang diperlukan']
    },
    kategori: {
        type: String,
        required: [true, 'Kategori barang diperlukan']
    },
    jumlah: {
        type: Number,
        required: [true, 'Jumlah barang diperlukan']
    },
    unit: {
        type: String,
        required: [true, 'Unit barang diperlukan']
    },
    keadaan: {
        type: String,
        required: [true, 'Keadaan barang diperlukan']
    },
    foto: {
        type: Object,
    }
},
    {
        timestamps: true
    }
)
const Inventaris = mongoose.model('Inventaris', InventarisSchema)
module.exports = Inventaris