import { Routes, Route } from "react-router-dom";
import { HomePage } from "../home/pages/HomePage";
import { AuthLayout } from "../features/authentication/pages/AuthLayout";
import { LoginPage } from "../features/authentication/pages/LoginPage";
import { SignupPage } from "../features/authentication/pages/SignupPage";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
            </Route>
        </Routes>
    )
}