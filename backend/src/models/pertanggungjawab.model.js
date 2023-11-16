const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LPJSchema = new Schema(
  {
    namaKegiatan: {
      type: String,
    },
    tempat: {
      type: String,
    },
    waktuKegiatan: {
      type: Date,
    },
    jumlahMahasiswa: {
      type: Number,
    },
    jumlahDosen: {
      type: Number,
    },
    biaya: {
      type: Number,
    },
    biayaAjuan: {
      type: Number,
    },
    narahubung: {
      type: String,
    },
    fileLPJ: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);
const LembarPertanggungjawaban = mongoose.model(
  "LembarPertanggungjawaban",
  LPJSchema
);
module.exports = LembarPertanggungjawaban;
