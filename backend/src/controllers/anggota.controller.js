const Anggota = require('../models/anggota.model');
const ErrorHandler = require('../utils/error-handler');
const { uploadFileToGdrive, deleteFile } = require("../services/upload-file.service");

// function untuk menampilkan semua data anggota
exports.index = async (req, res, next) => {
    try{
        const anggota = await Anggota.find();
        if(!anggota) {
            const error = new ErrorHandler(400, "Data Anggota Tidak Ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            data: anggota
        });
    } catch (error) {
        return next(error);
    }
}

// function untuk menambahkan data anggota
exports.create = async (req, res, next) => {
    try{
        const { 
            namaAnggota, 
            fakultasAnggota, 
            prodiAnggota, 
            nimAnggota, 
            emailAnggota, 
            posisiAnggota,
            statusAnggota,
            nomorHpAnggota,
            ttlAnggota,
            asalAnggota,
            periodeAnggota, 
        } = req.body;

        const cekAnggota = await Anggota.findOne({namaAnggota : namaAnggota});
        if(cekAnggota) {
            const error = new ErrorHandler(400, "Anggota Sudah Terdaftar");
            return next(error);
        }

        let foto = {};
        if(req.files && req.files.foto) {
             foto = await uploadFileToGdrive(req.files);
        }

        const anggota = new Anggota({ 
            namaAnggota : namaAnggota, 
            fakultasAnggota : fakultasAnggota, 
            prodiAnggota : prodiAnggota, 
            nimAnggota : nimAnggota, 
            emailAnggota : emailAnggota, 
            posisiAnggota : posisiAnggota, 
            foto : foto.foto, 
            statusAnggota : statusAnggota,
            nomorHpAnggota : nomorHpAnggota,
            ttlAnggota : ttlAnggota,
            asalAnggota : asalAnggota,
            periodeAnggota : periodeAnggota
        });

        await anggota.save();
        res.status(200).json({
            error: false,
            message: "Data Anggota Berhasil Ditambahkan",
            data: anggota
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

// function untuk menampilkan data anggota berdasarkan id
exports.show = async (req, res, next) => {
    const idAnggota = req.params.id;
    try {
        const anggota = await Anggota.findOne({_id : idAnggota});
        if(!anggota) {
            const error = new ErrorHandler(400, "Data Anggota Tidak Ditemukan");
            return next(error);
        } else {
            res.status(200).json({
                error: false,
                data: anggota
            })
        } 
    } catch (error) {
        return next(error);
    }
};

// function untuk mengupdate data anggota berdasarkan id
exports.update = async (req, res, next) => {
    const idAnggota = req.params.id;
    try{
        const anggota = await Anggota.findByIdAndUpdate(idAnggota, req.body, {new : true});
        
        if(!anggota) {
            const error = new ErrorHandler(400, "Data Anggota Tidak Ditemukan");
            return next(error);
        } else {
            res.status(200).json({
                error: false,
                data: anggota,
                message: "Data Anggota Berhasil Diupdate",
            })
        }
    } catch (error) {
        return next(error);
    }
};

// function untuk menghapus data anggota berdasarkan id
exports.delete = async (req, res, next) => {
    const idAnggota = req.params.id;
    try {
        const anggota = await Anggota.findByIdAndRemove(idAnggota);
        if(!anggota) {
            const error = new ErrorHandler(400, "Data Anggota Tidak Ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            message: "Data Anggota Berhasil Dihapus",
        });
    } catch (error) {
        return next(error);
    }
};