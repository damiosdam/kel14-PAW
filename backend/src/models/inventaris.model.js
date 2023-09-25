const mongoose = require('mongoose')
const Schema = mongoose.Schema
const InventarisSchema = new Schema({
    namaBarang: {
        type: String
    },
    kategori: {
        type: String
    },
    jumlah: {
        type: Number
    },
    unit: {
        type: String
    },
    keadaan: {
        type: String
    },
    foto: {
        type: Object
    }
},
    {
        timestamps: true
    }
)
const Inventaris = mongoose.model('Inventaris', InventarisSchema)
module.exports = Inventaris