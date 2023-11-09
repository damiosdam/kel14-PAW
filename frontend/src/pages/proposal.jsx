import { Helmet } from 'react-helmet-async';
import Top from '../components/top';
export default function AppPage() {
    return (
        <>
            <Helmet>
                <title> Manajemen UKM </title>
            </Helmet>
            <Top namaPage="Proposal" target="/proposal/tambah" />
        </>
    );
}
