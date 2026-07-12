import { Routes, Route } from "react-router-dom";
import { HomePage } from "../home/pages/HomePage";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}