import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';

export const Home = lazy(() => import('../pages/app'));
export const AnggotaPage = lazy(() => import('../pages/anggota'));
export const InventarisPage = lazy(() => import('../pages/inventaris'));
export const PersuratanPage = lazy(() => import('../pages/persuratan'));
export const ProposalPage = lazy(() => import('../pages/proposal'));
export const LPJPage = lazy(() => import('../pages/lpj'));
export const LoginPage = lazy(() => import('../pages/login'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                { element: <Home />, index: true },
                { path: 'anggota', element: <AnggotaPage /> },
                { path: 'inventaris', element: <InventarisPage /> },
                { path: 'persuratan', element: <PersuratanPage /> },
                { path: 'proposal', element: <ProposalPage /> },
                { path: 'lpj', element: <LPJPage /> },
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: '404',
            element: <Page404 />,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}