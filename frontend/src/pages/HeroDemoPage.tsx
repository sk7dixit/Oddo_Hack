import { HeroSection } from "@/components/ui/hero-section-1"
import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

export default function HeroDemoPage() {
    return (
        <div className="w-full">
            <HeroSection />
        </div>
    )
}
