import { Helmet } from 'react-helmet-async';
import SayHi from '../sections/say-hi';
export default function AppPage() {
    return (
        <>
            <Helmet>
                <title> Manajemen UKM </title>
            </Helmet>
            <SayHi />
        </>
    );
}
