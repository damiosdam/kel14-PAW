import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Top from "../../components/top";
import { keadaan, units } from "./config-lpj";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function AppPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaKegiatan: "",
    tempat: "",
    waktuKegiatan: "",
    jumlahMahasiswa: 0,
    jumlahDosen: 0,
    biaya: 0,
    biayaAjuan: 0,
    narahubung: "",
    fileLPJ: null,
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    // Mengelola input file (foto)
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Hanya mengambil file pertama dari array file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const clearForm = () => {
    setFormData({
      namaKegiatan: "",
      tempat: "",
      waktuKegiatan: "",
      jumlahMahasiswa: "",
      jumlahDosen: "",
      biaya: "",
      biayaAjuan: "",
      narahubung: "",
      fileLPJ: null,
    });
  };
  const checkForm = () => {
    let isFullfilled = true;
    if (
      formData.namaKegiatan === "" ||
      formData.tempat === "" ||
      formData.waktuKegiatan === "" ||
      formData.jumlahMahasiswa === "" ||
      formData.jumlahDosen === "" ||
      formData.biaya === "" ||
      formData.biayaAjuan === "" ||
      formData.narahubung === "" ||
      formData.fileLPJ === null
    ) {
      isFullfilled = false;
    }
    return isFullfilled;
  };
  const handleSubmit = () => {
    if (checkForm() === false) {
      Notify.warning("Semua form bertanda bintang harus diisi!");
      return;
    }
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("namaKegiatan", formData.namaKegiatan);
      formDataToSend.append("tempat", formData.tempat);
      formDataToSend.append("waktuKegiatan", formData.waktuKegiatan);
      formDataToSend.append("jumlahMahasiswa", formData.jumlahMahasiswa);
      formDataToSend.append("jumlahDosen", formData.jumlahDosen);
      formDataToSend.append("biaya", formData.biaya);
      formDataToSend.append("biayaAjuan", formData.biayaAjuan);
      formDataToSend.append("narahubung", formData.narahubung);
      formDataToSend.append("fileLPJ", formData.fileLPJ);
      // Kirim data ke backend
      axios
        .post("http://localhost:5000/api/v1/lpj", formDataToSend)
        .then((response) => {
          Report.success(
            "Sukses!",
            "Berhasil menambahkan LPJ: " + formData.namaKegiatan,
            "Okay",
            () => {
              clearForm();
              setLoading(false);
            }
          );
        });
    } catch (error) {
      Report.failure("Terjadi kesalahan", error.message, "Okay");
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Tambah Lembar Pertanggungjawaban</title>
      </Helmet>
      <Container>
        <Top namaPage="Tambah Lembar Pertanggungjawaban" back="/lpj" />
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={2}
          boxShadow={4}
          p={2}
          borderRadius={2}
          bgcolor="background.paper"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Nama Kegiatan"
                fullWidth
                name="namaKegiatan"
                value={formData.namaKegiatan}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Tempat"
                fullWidth
                name="tempat"
                value={formData.tempat}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Waktu Kegiatan"
                type="date"
                fullWidth
                name="waktuKegiatan"
                value={formData.waktuKegiatan}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Jumlah Mahasiswa"
                type="number"
                fullWidth
                name="jumlahMahasiswa"
                value={formData.jumlahMahasiswa}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Jumlah Dosen"
                type="number"
                fullWidth
                name="jumlahDosen"
                value={formData.jumlahDosen}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Biaya"
                type="number"
                fullWidth
                name="biaya"
                value={formData.biaya}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Biaya Ajuan"
                type="number"
                fullWidth
                name="biayaAjuan"
                value={formData.biayaAjuan}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Narahubung"
                fullWidth
                name="narahubung"
                value={formData.narahubung}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <input
                                type="file"
                                accept="image/*"
                                name="foto"
                                onChange={handleInputChange}
                            /> */}
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  name="fileLPJ"
                  type="file"
                  onChange={handleInputChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end">
              {loading ? (
                Loading.dots()
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "1rem", marginLeft: "1rem" }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Simpan
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
