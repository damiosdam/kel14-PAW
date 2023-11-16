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
import { Notify } from "notiflix/build/notiflix-notify-aio";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Top from "../../components/top";

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
  const { id } = useParams(); // Ambil ID dari parameter URL
  const [itemData, setItemData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Panggil API untuk mendapatkan detail item berdasarkan ID
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/lpj/${id}`
        );
        setItemData(response?.data?.data);
        setEditedData(response?.data?.data);
      } catch (error) {
        Notify.failure(`Error fetching item details: ${error}`);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    // Mengelola input file (foto)
    if (type === "file") {
      setEditedData((prevData) => ({
        ...prevData,
        [name]: files[0], // Hanya mengambil file pertama dari array file
      }));
    } else {
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSaveChanges = () => {
    // Panggil API untuk menyimpan perubahan
    axios
      .put(`http://localhost:5000/api/v1/lpj/${id}`, editedData)
      .then((response) => {
        Notify.success("Perubahan disimpan");
        setIsEditing(false);
      })
      .catch((error) => {
        Notify.failure(`Error saat menyimpan perubahan : ${error}`);
      });
  };
  const handleCancelEdit = () => {
    // Kembalikan data yang diubah ke data awal
    setEditedData(itemData);
    setIsEditing(false);
  };
  const checkForm = () => {
    let isFullfilled = true;

    return isFullfilled;
  };
  return (
    <>
      <Helmet>
        <title>Detail Inventaris</title>
      </Helmet>
      <Container>
        <Top namaPage="Detail Inventaris" back="/lpj" />
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
                value={editedData.namaKegiatan}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Tempat"
                fullWidth
                name="tempat"
                value={editedData.tempat}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Waktu Kegiatan"
                type="date"
                fullWidth
                name="waktuKegiatan"
                value={editedData.waktuKegiatan}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Jumlah Mahasiswa"
                type="jumlahMahasiswa"
                fullWidth
                name="jumlahMahasiswa"
                value={editedData.jumlahMahasiswa}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Jumlah Dosen"
                type="jumlahDosen"
                fullWidth
                name="jumlahDosen"
                value={editedData.jumlahDosen}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Biaya"
                type="biaya"
                fullWidth
                name="biaya"
                value={editedData.biaya}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Biaya Ajuan"
                type="biayaAjuan"
                fullWidth
                name="biayaAjuan"
                value={editedData.biayaAjuan}
                onChange={handleInputChange}
                disabled={!isEditing}
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
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    style={{ marginTop: "1rem", marginLeft: "1rem" }}
                  >
                    Simpan Perubahan
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelEdit}
                    style={{ marginTop: "1rem", marginLeft: "1rem" }}
                  >
                    Batal
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  style={{ marginTop: "1rem", marginLeft: "1rem" }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
