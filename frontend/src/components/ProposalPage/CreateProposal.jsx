import { useState, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, InputLabel, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function InputField({ label, name, value, onChange }) {
const textFieldProps = {
    shrink: true,
    variant: 'outlined',
    sx: {
        width: '575px',
        height: '65px', 
        flexShrink: 0,
        borderRadius: '10px',
        background: '#DEDEDE',
        '& .MuiInputBase-root': {
        height: '65px',
        },
        marginRight: '650px',
    },
    onChange: onChange,
};

    const labelProps = {
    shrink: true,
    variant: 'outlined',
    sx: {
        color: '#000',
        fontFamily: 'Inter',
        fontSize: '35px',
        fontWeight: '600',
    },
};

return (
    <Grid item xs={6} style={{ paddingRight: '93px' }}>
        <InputLabel {...labelProps}>{label}</InputLabel>
        <TextField name={name} value={value} {...textFieldProps} />
    </Grid>
    );
}

function FileUpload({ onFileInputChange, fileName, cancelUpload, fileInputRef }) {
    return (
        <Grid container direction="column" alignItems="flex-start" sx={{ marginLeft: '50px' }}>
            <Typography 
                sx={{
                    color: '#4A4A4A',
                    fontFamily: 'Inter',
                    fontSize: '50px',
                    fontWeight: '700',
                    marginBottom: '20px',
                }}
            >
                Tambah File Proposal
            </Typography>
            <Grid container direction="column" alignItems="flex-start">
                <Typography 
                    sx={{
                        color: '#000',
                        fontFamily: 'Inter',
                        fontSize: '35px',
                        fontWeight: '600',
                        marginBottom: '10px',
                    }}
                >
                    Upload File
                </Typography>
                <Box
                    onClick={() => !fileName && fileInputRef.current.click()}
                    sx={{
                        width: '1340px',
                        height: '613px',
                        border: '1px solid black',
                        borderRadius: '10px',
                        bgcolor: '#DEDEDE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        position: 'relative',
                    }}
                >
                    {fileName ? (
                        <>
                            <Typography variant="h4" sx={{ fontSize: '28px' }}>{fileName}</Typography>
                            <button onClick={cancelUpload} style={{ fontSize: '28px', position: 'absolute', top: '20px', right: '20px' }}>X</button>
                        </>
                    ) : (
                        <Typography variant="h4" sx={{ fontSize: '28px' }}>Click to upload file</Typography>
                    )}
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={onFileInputChange} accept=".pdf,.doc,.docx,.txt" />
                </Box>
            </Grid>
        </Grid>
    );
}


function CreateProposal() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [step, setStep] = useState(1);
    const fileInputRef = useRef();
    const [form, setForm] = useState({
    namaKegiatan: '',
    tempat: '',
    waktuKegiatan: '',
    jumlahMahasiswaTerlibat: '',
    jumlahDosenTerlibat: '',
    biayaYangDiajukan: '',
    narahubung: '',
    biayaYangDigunakan: '',
    });


    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const cancelUpload = () => {
        setSelectedFile(null);
        setFileName(null);
        fileInputRef.current.value = null;
    };

    const uploadFile = async () => {
    const formData = new FormData();
    formData.append('proposalFile', selectedFile);

    for (const key in form) {
        formData.append(key, form[key]);
    }

    try {
        const res = await axios.post('http://localhost:5000/api/v1/proposal', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (step === 1) {
        await axios.post('http://localhost:5000/api/v1/proposal', form);
        alert('Proposal created successfully');
        navigate('/proposal');
        } else if (step === 2 && selectedFile) {
        await uploadFile();
        alert('File uploaded successfully');
        navigate('/proposal'); 
        } else {
        alert('Please upload a file before submission');
        }
    } catch (error) {
        console.error(error);
    }
    };

    return (
        <Box
            sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gridGap: '20px',
            padding: '10px 111px 654px 42px',
            width: '1400px',
            height: '500px',
            flexShrink: 0,
            borderRadius: '15px',
            background: '#F8F8F8',
            }}
        >
            <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
                {step === 1 && (
                <>
                    <InputField label="Nama Kegiatan" name="namaKegiatan" value={form.namaKegiatan} onChange={handleChange} />
                    <InputField label="Tempat" name="tempat" value={form.tempat} onChange={handleChange} />
                    <InputField label="Waktu Kegiatan" name="waktuKegiatan" value={form.waktuKegiatan} onChange={handleChange} />
                    <InputField label="Jumlah Mahasiswa Terlibat" name="jumlahMahasiswaTerlibat" value={form.jumlahMahasiswaTerlibat} onChange={handleChange} />
    
                    <InputField label="Jumlah Dosen Terlibat" name="jumlahDosenTerlibat" value={form.jumlahDosenTerlibat} onChange={handleChange} />
                    <InputField label="Biaya Yang Diajukan" name="biayaYangDiajukan" value={form.biayaYangDiajukan} onChange={handleChange} />
                    <InputField label="Narahubung" name="narahubung" value={form.narahubung} onChange={handleChange} />
                    <InputField label="Biaya Yang Digunakan" name="biayaYangDigunakan" value={form.biayaYangDigunakan} onChange={handleChange} />
                </>
                )}
                {step === 2 && <FileUpload onFileInputChange={handleFileInput} fileName={fileName} cancelUpload={cancelUpload} fileInputRef={fileInputRef} />}
            </Grid>
            {step === 1 && 
                
                <Button 
                    onClick={() => setStep(step + 1)} 
                    sx={{width: '290px', height: '60px', flexShrink: 0, backgroundColor: '#546FCF', marginLeft: '965px', marginTop: '20px'}}
                >
                    <Typography 
                        sx={{
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '35px',
                            fontWeight: '600',
                        }}
                    >
                        Lanjut
                    </Typography>
                </Button>
            }
            {step === 2 && (
                <>
                <Button onClick={() => setStep(step - 1)}>Sebelumnya</Button>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
                </>
            )}
            </form>
        </Box>
        );
    }
export default CreateProposal;