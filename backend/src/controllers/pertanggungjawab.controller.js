const LPJModel = require("../models/pertanggungjawab.model");
const ErrorHandler = require("../utils/error-handler");
const {
  uploadFileToGdrive,
  deleteFile,
} = require("../services/upload-file.service");

exports.index = async (req, res, next) => {
  try {
    const LPJ = await LPJModel.find();
    if (!LPJ) {
      const error = new ErrorHandler(400, "Data LPJ Tidak Ditemukan");
      return next(error);
    }
    res.status(200).json({
      error: false,
      data: LPJ,
    });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      namaKegiatan,
      tempat,
      waktuKegiatan,
      jumlahMahasiswa,
      jumlahDosen,
      biaya,
      biayaAjuan,
      narahubung,
    } = req.body;

    const cekLPJ = await LPJModel.findOne({
      namaKegiatan: namaKegiatan,
    });
    if (cekLPJ) {
      const error = new ErrorHandler(400, "Kegiatan Sudah Terdaftar");
      return next(error);
    }

    let fileLPJ = {};
    if (req.files && req.files.fileLPJ) {
      fileLPJ = await uploadFileToGdrive(req.files);
    }

    const LPJ = new LPJModel({
      namaKegiatan: namaKegiatan,
      tempat: tempat,
      waktuKegiatan: waktuKegiatan,
      jumlahMahasiswa: jumlahMahasiswa,
      jumlahDosen: jumlahDosen,
      biaya: biaya,
      biayaAjuan: biayaAjuan,
      narahubung: narahubung,
      fileLPJ: fileLPJ,
    });

    await LPJ.save();
    res.status(200).json({
      error: false,
      message: "Data LPJ Berhasil Ditambahkan",
      data: LPJ,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.show = async (req, res, next) => {
  const idLPJ = req.params.id;
  try {
    const LPJ = await LPJModel.findOne({ _id: idLPJ });
    if (!LPJ) {
      const error = new ErrorHandler(400, "Data LPJ Tidak Ditemukan");
      return next(error);
    } else {
      res.status(200).json({
        error: false,
        data: LPJ,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  const idLPJ = req.params.id;
  try {
    const {
      namaKegiatan,
      tempat,
      waktuKegiatan,
      jumlahMahasiswa,
      jumlahDosen,
      biaya,
      biayaAjuan,
      narahubung,
    } = req.body;
    const LPJ = await LPJModel.findOne({ _id: idLPJ });

    if (!LPJ) {
      const error = new ErrorHandler(400, "Data LPJ Tidak Ditemukan");
      return next(error);
    } else {
      const { fileLPJ } = await uploadFileToGdrive(req.files);
      if (namaKegiatan != undefined) {
        LPJ.namaKegiatan = namaKegiatan;
      }
      if (tempat != undefined) {
        LPJ.tempat = tempat;
      }
      if (waktuKegiatan != undefined) {
        LPJ.waktuKegiatan = waktuKegiatan;
      }
      if (jumlahMahasiswa != undefined) {
        LPJ.jumlahMahasiswa = jumlahMahasiswa;
      }
      if (jumlahDosen != undefined) {
        LPJ.jumlahDosen = jumlahDosen;
      }
      if (biaya != undefined) {
        LPJ.biaya = biaya;
      }
      if (biayaAjuan != undefined) {
        LPJ.biayaAjuan = biayaAjuan;
      }
      if (narahubung != undefined) {
        LPJ.narahubung = narahubung;
      }
      if (fileLPJ != undefined) {
        await deleteFile(LPJ.fileLPJ.fileId);
        LPJ.fileLPJ = fileLPJ;
      }
      LPJ.save();
      res.status(200).json({
        error: false,
        message: "Data LPJ Berhasil Diupdate",
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  const idLPJ = req.params.id;
  try {
    const LPJ = await LPJModel.findByIdAndRemove(idLPJ);
    if (!LPJ) {
      const error = new ErrorHandler(400, "Data LPJ Tidak Ditemukan");
      return next(error);
    }
    res.status(200).json({
      error: false,
      message: "Data LPJ Berhasil Dihapus",
    });
  } catch (error) {
    return next(error);
  }
};
