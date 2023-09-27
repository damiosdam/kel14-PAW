const AnggotaModel = require('../models/anggota.model');
const ErrorHandler = require('../utils/error-handler');
const { uploadFileToGdrive, deleteFile } = require("../services/upload-file.service");

exports.index = async (req, res, next) => {
    try{
        const anggota = await AnggotaModel.find();
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

exports.create = async (req, res, next) => {
    try{
        const {
            nomorAnggota, 
            namaAnggota, 
            fakultasAnggota, 
            prodiAnggota, 
            nimAnggota, 
            emailAnggota, 
            posisiAnggota, 
            fotoAnggota, 
            statusAnggota,
            nomorHpAnggota,
            ttlAnggota,
            asalAnggota,
            periodeAnggota, 
        } = req.body;

        const cekAnggota = await AnggotaModel.findOne({nomorAnggota : nomorAnggota});
        if(cekAnggota) {
            const error = new ErrorHandler(400, "Nomor Anggota Sudah Terdaftar");
            return next(error);
        }

        const anggota = new AnggotaModel({
            nomorAnggota : nomorAnggota, 
            namaAnggota : namaAnggota, 
            fakultasAnggota : fakultasAnggota, 
            prodiAnggota : prodiAnggota, 
            nimAnggota : nimAnggota, 
            emailAnggota : emailAnggota, 
            posisiAnggota : posisiAnggota, 
            fotoAnggota : fotoAnggota, 
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

exports.show = async (req, res, next) => {
    const idAnggota = req.params.id;
    try {
        const anggota = await AnggotaModel.findOne({_id : idAnggota});
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

exports.update = async (req, res, next) => {
    const idAnggota = req.params.id;
    try{
        const {
            nomorAnggota, 
            namaAnggota, 
            fakultasAnggota, 
            prodiAnggota, 
            nimAnggota, 
            emailAnggota, 
            posisiAnggota, 
            fotoAnggota, 
            statusAnggota,
            nomorHpAnggota,
            ttlAnggota,
            asalAnggota,
            periodeAnggota, 
        } = req.body;
        const anggota = await AnggotaModel.findOne({_id : idAnggota});
        
        if(!anggota) {
            const error = new ErrorHandler(400, "Data Anggota Tidak Ditemukan");
            return next(error);
        } else {
            const {anggotaFile} = await uploadFileToGdrive(req.files);
            if(namaAnggota != undefined) {
                anggota.namaAnggota = namaAnggota;
            }
            if(fakultasAnggota != undefined) {
                anggota.fakultasAnggota = fakultasAnggota;
            }
            if(prodiAnggota != undefined) {
                anggota.prodiAnggota = prodiAnggota;
            }
            if(nimAnggota != undefined) {
                anggota.nimAnggota = nimAnggota;
            }
            if(emailAnggota != undefined) {
                anggota.emailAnggota = emailAnggota;
            }
            if(posisiAnggota != undefined) {
                anggota.posisiAnggota = posisiAnggota;
            }
            if(fotoAnggota != undefined) {
                anggota.fotoAnggota = anggotaFile;
            }
            if(statusAnggota != undefined) {
                anggota.statusAnggota = statusAnggota;
            }
            if(nomorHpAnggota != undefined) {
                anggota.nomorHpAnggota = nomorHpAnggota;
            }
            if(ttlAnggota != undefined) {
                anggota.ttlAnggota = ttlAnggota;
            }
            if(asalAnggota != undefined) {
                anggota.asalAnggota = asalAnggota;
            }
            if(periodeAnggota != undefined) {
                anggota.periodeAnggota = periodeAnggota;
            }
            anggota.save();
            res.status(200).json({
                error: false,
                message: "Data Anggota Berhasil Diupdate",
            })
        }
    } catch (error) {
        return next(error);
    }
};

exports.delete = async (req, res, next) => {
    const idAnggota = req.params.id;
    try {
        const anggota = await AnggotaModel.findByIdAndRemove(idAnggota);
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