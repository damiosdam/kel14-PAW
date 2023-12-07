import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import CreateProposal from "../pages/ProposalPage/CreateProposal";
import ProposalView from "../pages/ProposalPage/ProposalView";

export const Home = lazy(() => import("../pages/app"));
export const AnggotaPage = lazy(() => import("../pages/anggota"));
export const TambahAnggota = lazy(() => import("../pages/anggota/tambah"));
export const DetailAnggota = lazy(() => import("../pages/anggota/detail"));
export const InventarisPage = lazy(() => import("../pages/inventaris"));
export const TambahInventaris = lazy(() =>
  import("../pages/inventaris/tambah")
);
export const DetailInventaris = lazy(() =>
  import("../pages/inventaris/detail")
);
export const PersuratanPage = lazy(() => import("../pages/persuratan"));
export const ProposalPage = lazy(() => import("../pages/ProposalPage/proposal"));
export const LPJPage = lazy(() => import("../pages/lpj/index"));
export const TambahLPJPage = lazy(() => import("../pages/lpj/tambah"));
export const DetailLPJPage = lazy(() => import("../pages/lpj/detail"));
export const LoginPage = lazy(() => import("../pages/auth/login"));
export const SignupPage = lazy(() => import("../pages/auth/signup"));
export const ActivatePage = lazy(() => import("../pages/auth/activate"));
export const VerifiedPage = lazy(() => import("../pages/auth/verified"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

export default function Router() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token'))) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);
  const location = useLocation();
  const routes = useRoutes([
    {
      path: "/",
      element: auth ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" state={{ from: location }} replace />,
    },
    {
      element: auth ? (
        <DashboardLayout setAuth={setAuth}>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : <Navigate to="/login" state={{ from: location }} replace />,
      children: [
        { path: "dashboard", element: <Home />, index: true },
        { path: "anggota", element: <AnggotaPage /> },
        { path: "anggota/:id", element: <DetailAnggota /> },
        { path: "anggota/tambah", element: <TambahAnggota /> },
        { path: "inventaris", element: <InventarisPage /> },
        { path: "inventaris/:id", element: <DetailInventaris /> },
        { path: "inventaris/tambah", element: <TambahInventaris /> },
        { path: "persuratan", element: <PersuratanPage /> },
        { path: "persuratan/:id", element: <PersuratanPage /> },
        { path: "proposal", element: <ProposalPage /> },
        { path: "proposal/:id", element: <ProposalView /> },
        { path: "proposal/create", element: <CreateProposal /> },
        { path: "lpj", element: <LPJPage /> },
        { path: "lpj/:id", element: <DetailLPJPage /> },
        { path: "lpj/tambah", element: <TambahLPJPage /> },
      ],
    },
    {
      path: "login",
      element: auth ? <Navigate to="/" state={{ from: location }} replace /> : <LoginPage setAuth={setAuth} />,
    },
    {
      path: "signup",
      element: auth ? <Navigate to="/" state={{ from: location }} replace /> : <SignupPage setAuth={setAuth} />,
    },
    {
      path: "activate",
      element: auth ? <Navigate to="/" state={{ from: location }} replace /> : <ActivatePage setAuth={setAuth} />,
    },
    {
      path: "verified",
      element: <VerifiedPage setAuth={setAuth} />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
