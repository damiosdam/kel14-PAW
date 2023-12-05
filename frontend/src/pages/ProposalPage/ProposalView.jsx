import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FileViewer from 'react-file-viewer';
import axios from 'axios';

export default function ProposalView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proposal, setProposal] = useState(null);

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/proposal/${id}`);
                setProposal(response.data.data); 
            } catch (error) {
                console.error('Error fetching proposal:', error);
            }
        };
    
        fetchProposal();
    }, [id]);

    const deleteProposals = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/proposal/${id}`);
            navigate('/proposal');
        } catch (error) {
            console.error('Error deleting proposals:', error);
        }
    };

    const fileTypes = {
        pdf: 'pdf',
        docx: 'docx',
        png: 'png',
        img: 'img',
        jpg: 'jpg',
        jpeg: 'jpeg',
    };

    return (
        <div>
            {proposal && (
                <>
                    <h1>{proposal.namaKegiatan}</h1>
                    <p>Tempat: {proposal.tempat}</p>
                    <p>Waktu Kegiatan: {proposal.waktuKegiatan}</p>
                    <p>Jumlah Mahasiswa Terlibat: {proposal.jumlahMahasiswaTerlibat}</p>
                    <p>Jumlah Dosen Terlibat: {proposal.jumlahDosenTerlibat}</p>
                    <p>Biaya Yang Diajukan: {proposal.biayaYangDiajukan}</p>
                    <p>Narahubung: {proposal.narahubung}</p>
                    <p>Biaya Yang Digunakan: {proposal.biayaYangDigunakan}</p>
                    {proposal.proposalFile && (
                        <FileViewer
                            fileType={fileTypes[proposal.proposalFile.extension]} 
                            filePath={proposal.proposalFile.exportLink} 
                            onError={(e) => console.log('Error:', e)} 
                            style={{ width: '100%', height: '600px' }} 
                        />
                    )}
                    <button onClick={deleteProposals}>Delete Proposal</button>
                </>
            )}
        </div>
    );
}