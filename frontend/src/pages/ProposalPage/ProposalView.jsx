import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FileViewer from 'react-file-viewer';
import { useNavigate, useParams } from 'react-router-dom';
import authHeader from '../../services/auth-header';

export default function ProposalView() {
    const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD;
    const { id } = useParams();
    const navigate = useNavigate();
    const [proposal, setProposal] = useState(null);

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await axios.get(`${URL}/api/v1/proposal/${id}`, { headers: authHeader() });
                setProposal(response.data.data);
            } catch (error) {
                console.error('Error fetching proposal:', error);
            }
        };

        fetchProposal();
    }, [id]);

    const deleteProposals = async () => {
        try {
            await axios.delete(`${URL}/api/v1/proposal/${id}`, { headers: authHeader() });
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