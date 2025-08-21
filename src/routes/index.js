import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../components/atoms/Loader";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
const AuthLogin = lazy(() => import("../components/templates/Login"));
const SignUp = lazy(() => import("../components/templates/SignUp"));
const ForgotPassword = lazy(() =>
  import("../components/templates/ForgotPassword")
);
const SetPassword = lazy(() => import("../components/templates/SetPassword"));
const Dashboard = lazy(() => import("../components/templates/Dashboard"));
const Certificate = lazy(() => import("../components/templates/Certificate"));
const CreateInvoice = lazy(() =>
  import("../components/templates/Certificate/Create")
);
const EditInvoice = lazy(() => import("../components/templates/Certificate/Edit"));
const ViewCertificate = lazy(() => import("../components/templates/Certificate/View"));
const CertificateInfo = lazy(() => import("../components/templates/Certificate/CertificateInfo"));
const Cards = lazy(() => import("../components/templates/Cards"));
const CreateCard = lazy(() => import("../components/templates/Cards/Create"));
const EditCard = lazy(() => import("../components/templates/Cards/Edit"));
const ViewCard = lazy(() => import("../components/templates/Cards/View"));
const CardInfo = lazy(() => import("../components/templates/Cards/CardInfo"));
const Users = lazy(() => import("../components/templates/Users"));
const ChangePassword = lazy(() => import("../components/templates/ChangePassword"));
const Profile = lazy(() => import("../components/templates/Profile"));

const Switcher = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<AuthLogin />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/set-password/:token" element={<SetPassword />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/certificate/create" element={<CreateInvoice />} />
          <Route path="/certificate/edit/:id" element={<EditInvoice />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/create" element={<CreateCard />} />
          <Route path="/cards/edit/:id" element={<EditCard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/change-password" element={<ChangePassword />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/profile/:id" element={<Profile />}/>
        </Route>

        <Route>
          <Route path="/cards/view/:id" element={<ViewCard />} />
          <Route path="/cards/details/:id" element={<CardInfo />} />
          <Route path="/certificate/view/:id" element={<ViewCertificate />} />
          <Route path="/certificate/details/:id" element={<CertificateInfo />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Switcher;
