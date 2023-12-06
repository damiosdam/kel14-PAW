import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

    const deleteProposal = async () => {
        try {
            await axios.delete(`${URL}/api/v1/proposal/${id}`, { headers: authHeader() });
            navigate('/proposal');
        } catch (error) {
            console.error('Error deleting proposal:', error);
        }
    };

    const editProposal = () => {
        navigate(`/proposal/${id}/edit`);
    };

    const renderProposalFile = () => {
        if (proposal && proposal.proposalFile) {
            const fileExtension = proposal.proposalFile.fileExtension;
            const isPDF = fileExtension === 'pdf';
            const isDOCX = fileExtension === 'docx';

            if (isPDF || isDOCX) {
                const googleDriveUrl = proposal.proposalFile.exportLink;
                const downloadLink = proposal.proposalFile.downloadLink;

                return (
                    <div>
                        <iframe
                            title="Proposal Document"
                            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${googleDriveUrl}`}
                            style={{ width: '100%', height: '600px' }}
                        />
                        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                            <button>Download Proposal</button>
                        </a>
                    </div>
                );
            } else {
                return <p>This document format is not supported for preview.</p>;
            }
        }
        return null;
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
                    {renderProposalFile()}
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <button onClick={deleteProposal} style={{ marginRight: '10px' }}>
                            Delete Proposal
                        </button>
                        <button onClick={editProposal} style={{ marginRight: '10px' }}>
                            Edit Proposal
                        </button>
                        {proposal.proposalFile && (
                            <a href={proposal.proposalFile.downloadLink} target="_blank" rel="noopener noreferrer">
                                <button>Download Proposal</button>
                            </a>
                        )}
                    </div>
                </>
            )
            }
        </div >
    );
}