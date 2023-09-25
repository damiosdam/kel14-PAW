const InventarisModel = require("../models/inventaris.model");
const ErrorHandler = require("../utils/error-handler");
const { uploadFileToGdrive, deleteFile } = require("../services/upload-file.service");
exports.index = async (req, res, next) => {
    try {
        // isi fungsi
        const barang = await InventarisModel.find();
        if (!barang) {
            const error = new ErrorHandler(400, "Data Inventaris tidak ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            data: barang
        })
    } catch (error) {
        return next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const { namaBarang, kategori, jumlah, unit, keadaan } = req.body;
        const cekBarang = await InventarisModel.findOne({ namaBarang: namaBarang });
        
        if (cekBarang) {
            const error = new ErrorHandler(400, "Barang sudah ada");
            return next(error);
        } 
        
        let foto = {};
        
        if (req.files && req.files.foto) {
            foto = await uploadFileToGdrive(req.files);
        }

        const barang = new InventarisModel({
            namaBarang: namaBarang,
            kategori: kategori,
            jumlah: jumlah,
            unit: unit,
            keadaan: keadaan,
            foto: foto.foto
        });

        await barang.save();
        res.status(200).json({
            error: false,
            message: "Berhasil menyimpan data",
            data: barang
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}


exports.show = async (req, res, next) => {
    const idBarang = req.params.id
    try {
        // isi fungsi
        const barang = await InventarisModel.findOne({ idBarang: idBarang });
        if (!barang) {
            const error = new ErrorHandler(400, "Barang tidak ditemukan");
            return next(error);
        } else {
            res.status(200).json({
                error: false,
                data: barang
            })
        }
    } catch (error) {
        return next(error);
    }
}

exports.update = async (req, res, next) => {
    const idBarang = req.params.id;
    try {
        const { namaBarang, kategori, jumlah, unit, keadaan } = req.body;
        const barang = await InventarisModel.findOne({ idBarang: idBarang });
        
        if (!barang) {
            const error = new ErrorHandler(400, `Barang dengan id ${idBarang} tidak ada`);
            return next(error);
        } else {
            const { foto } = await uploadFileToGdrive(req.files);
            if (namaBarang != undefined) {
                barang.namaBarang = namaBarang;
            }
            if (kategori != undefined) {
                barang.kategori = kategori;
            }
            if (namaBarang != undefined) {
                barang.jumlah = jumlah;
            }
            if (unit != undefined) {
                barang.unit = unit;
            }
            if (keadaan != undefined) {
                barang.keadaan = keadaan;
            }
            if (foto != undefined) {
                await deleteFile(barang.foto.fileId);
                barang.foto = foto;
            }
            barang.save();
            res.status(200).json({
                error: false,
                data: "Berhasil memperbarui data barang"
            })
        }
    } catch (error) {
        return next(error);
    }
}

exports.delete = async (req, res, next) => {
    const idBarang = req.params.id
    try {
        // isi fungsi
        const barang = await InventarisModel.findOne({ idBarang: idBarang });
        if (!barang) {
            const error = new ErrorHandler(404, "Barang tidak ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            message: "Berhasil menghapus barang"
        })
    } catch (error) {
        return next(error);
    }
}