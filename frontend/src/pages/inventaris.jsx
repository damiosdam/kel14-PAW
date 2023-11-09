import { Helmet } from 'react-helmet-async';
import Top from '../components/top';
export default function AppPage() {
    return (
        <>
            <Helmet>
                <title>Inventaris</title>
            </Helmet>
            <Top namaPage="Inventaris" target="/inventaris/tambah" />

        </>
    );
}
