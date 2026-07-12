import { Link } from "react-router-dom";
import { Hero } from "../copmonents/Hero";

export function HomePage() {
    return (
        <main>
            <nav className="flex justify-between items-center h-24">
                <Link to="/">DevAtlas</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Hero />
        </main>
    )
}