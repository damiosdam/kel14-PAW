const PersuratanModel = require("../models/persuratan.model");
const ErrorHandler = require("../utils/error-handler");

exports.index = async (req, res, next) => {
    try {
        const persuratans = await PersuratanModel.find();
        if (!persuratans) {
            const error = new ErrorHandler(400, "Data Persuratan tidak ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            data: persuratans
        });
    } catch (error) {
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { judulSurat, nomorSurat, tujuanSurat, fileUrlSurat, tanggalSurat, kategoriSurat } = req.body;

        const cekPersuratan = await PersuratanModel.findOne({ nomorSurat: nomorSurat });
        if (cekPersuratan) {
            const error = new ErrorHandler(400, "Surat sudah ada");
            return next(error);
        }

        const persuratan = new PersuratanModel({
            judulSurat: judulSurat,
            nomorSurat: nomorSurat,
            tujuanSurat: tujuanSurat,
            fileUrlSurat: fileUrlSurat,
            tanggalSurat: tanggalSurat,
            kategoriSurat: kategoriSurat
        });

        await persuratan.save();
        res.status(200).json({
            error: false,
            message: "Berhasil menyimpan data",
            data: persuratan
        });
    } catch (error) {
        return next(error);
    }
};

exports.show = async (req, res, next) => {
    const idPersuratan = req.params.id;
    try {
        const persuratan = await PersuratanModel.findOne({ _id: idPersuratan });
        if (!persuratan) {
            const error = new ErrorHandler(400, `Surat dengan id ${idPersuratan} tidak ada`);
            return next(error);
        }
        res.status(200).json({
            error: false,
            data: persuratan
        });
    } catch (error) {
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const idPersuratan = req.params.id;
    try {
        const { judulSurat, nomorSurat, tujuanSurat, fileUrlSurat, tanggalSurat, kategoriSurat } = req.body;
        const persuratan = await PersuratanModel.findOne({ _id: idPersuratan });

        if (!persuratan) {
            const error = new ErrorHandler(400, `Surat dengan id ${idPersuratan} tidak ada`);
            return next(error);
        } else {
            if (judulSurat !== undefined) {
                persuratan.judulSurat = judulSurat;
            }
            if (nomorSurat !== undefined) {
                persuratan.nomorSurat = nomorSurat;
            }
            if (tujuanSurat !== undefined) {
                persuratan.tujuanSurat = tujuanSurat;
            }
            if (fileUrlSurat !== undefined) {
                persuratan.fileUrlSurat = fileUrlSurat;
            }
            if (tanggalSurat !== undefined) {
                persuratan.tanggalSurat = tanggalSurat;
            }
            if (kategoriSurat !== undefined) {
                persuratan.kategoriSurat = kategoriSurat;
            }

            await persuratan.save();
            res.status(200).json({
                error: false,
                data: "Berhasil memperbarui data surat"
            });
        }
    } catch (error) {
        return next(error);
    }
};

exports.delete = async (req, res, next) => {
    const idPersuratan = req.params.id;
    try {
        const persuratan = await PersuratanModel.findByIdAndRemove(idPersuratan);
        if (!persuratan) {
            const error = new ErrorHandler(404, "Surat tidak ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            message: "Berhasil menghapus surat"
        });
    } catch (error) {
        return next(error);
    }
};
