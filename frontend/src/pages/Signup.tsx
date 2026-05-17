import { AuthGateway } from "@/components/ui/auth/AuthGateway";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Compass } from "lucide-react";

const TraveLoopLogo = () => (
  <div className="flex items-center gap-2">
      <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
          <Compass className="size-5 text-white" />
      </div>
  </div>
);

export default function Signup() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/travel-hub" replace />;
  }

  return (
    <AuthGateway 
      logo={<TraveLoopLogo />} 
      brandName="TraveLoop" 
      title="Get started with"
      subtitle="Immersive travel intelligence awaits"
    />
  );
}
