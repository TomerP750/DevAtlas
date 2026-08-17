import { Routes, Route } from "react-router-dom";
import { HomePage } from "../home/pages/HomePage";
import { AuthLayout } from "../features/authentication/pages/AuthLayout";
import { LoginPage } from "../features/authentication/pages/LoginPage";
import { SignupPage } from "../features/authentication/pages/SignupPage";
import { DashboardLayout } from "../features/dashboard/layout/DashboardLayout";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "../features/authentication/components/ProtectedRoute";
import { LoadingPage } from "../shared/ui/LoadingPage";

const SettingsPage = lazy(() => import("../features/dashboard/settings/pages/SettingsPage"));
const TopicPage = lazy(() => import("../features/dashboard/index/models/topic/TopicPage"));
const LearningPathPage = lazy(() => import("../features/dashboard/index/components/learningPathPage/learningPath/LearningPathPage"));
const DashboardIndexPage = lazy(() => import("../features/dashboard/index/components/index/IndexPage"));
const SectionPage = lazy(() => import("../features/dashboard/index/components/topicPage/section/SectionPage"));
const NotFoundPage = lazy(() => import("../shared/pages/NotFoundPage"));
const AiPathCreatorPage = lazy(() => import("../features/dashboard/ai_path_creator/pages/AiPathCreatorPage"));

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>

                    <Route index element={
                        <SuspenseWrapper>
                            <DashboardIndexPage />
                        </SuspenseWrapper>}
                    />

                    <Route path="ai-path-creator" element={
                        <SuspenseWrapper>
                            <AiPathCreatorPage />
                        </SuspenseWrapper>}
                    />

                    <Route path="learning-path/:learningPathId/topic/:topicId/section/:sectionId" element={
                        <SuspenseWrapper>
                            <SectionPage />
                        </SuspenseWrapper>}
                    />

                    <Route path="learning-path/:learningPathId/topic/:topicId" element={
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

                <Route path="*" element={
                    <SuspenseWrapper>
                        <NotFoundPage />
                    </SuspenseWrapper>
                } />

            </Route>
        </Routes>
    )
}

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<LoadingPage message="Loading..." />}>
            {children}
        </Suspense>
    )
}