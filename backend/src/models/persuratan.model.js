const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersuratanSchema = new Schema({
    judulSurat: {
        type: String
    },
    nomorSurat: {
        type: String
    },
    tujuanSurat: {
        type: String
    },
    fileUrlSurat: {
        type: String
    },
    tanggalSurat: {
        type: String,
        validate: {
            validator: function (v) {
                // Regular expression to validate the DD/MM/YYYY format
                const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                if (!datePattern.test(v)) {
                    return false;
                }
        
                // Check if the date is valid
                const [, day, month, year] = v.match(datePattern);
                const parsedDate = new Date(`${year}-${month}-${day}`);
                return !isNaN(parsedDate.getTime());
            },
            message: props => `${props.value} | Format tanggal adalah DD/MM/YYYY`
        }
    },
    kategoriSurat: {
        type: String
    },
},
    {
        timestamps: true
    }
)
const Persuratan = mongoose.model('Persuratan', PersuratanSchema)
module.exports = Persuratan