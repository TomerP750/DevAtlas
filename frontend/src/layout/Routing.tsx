import { Routes, Route } from "react-router-dom";
import { HomePage } from "../home/pages/HomePage";
import { AuthLayout } from "../features/authentication/pages/AuthLayout";
import { LoginPage } from "../features/authentication/pages/LoginPage";
import { SignupPage } from "../features/authentication/pages/SignupPage";
import { DashboardLayout } from "../features/dashboard/layout/DashboardLayout";
import { lazy, Suspense } from "react";
import { DashboardIndex } from "../features/dashboard/index/pages/DashboardIndex";
import { LearningPathPage } from "../features/dashboard/index/pages/LearningPathPage";
import { ProtectedRoute } from "../features/authentication/components/ProtectedRoute";
import { TopicPage } from "../features/dashboard/index/pages/TopicPage";

const SettingsPage = lazy(() => import("../features/dashboard/settings/pages/SettingsPage"));

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
            </Route>

            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/dashboard" element={<DashboardLayout />}>

                <Route index element={
                    <SuspenseWrapper>
                        <DashboardIndex />
                    </SuspenseWrapper>}
                />

                <Route path="learning-path/:learningPathId/topic/:id" element={
                    <SuspenseWrapper>
                        <TopicPage />
                    </SuspenseWrapper>}
                />

                <Route path="learning-path/:id" element={
                    <SuspenseWrapper>
                        <LearningPathPage />
                    </SuspenseWrapper>}
                />

                <Route path="settings" element={
                    <SuspenseWrapper>
                        <SettingsPage />
                    </SuspenseWrapper>}
                />



            </Route>
            {/* </Route> */}
        </Routes>
    )
}

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    )
}