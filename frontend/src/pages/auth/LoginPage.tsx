import { SignIn } from '@clerk/clerk-react';
import bgImage from '../../assets/image.png';
import './Auth.css';

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-bg-layer" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="auth-card-wrapper">
        <SignIn fallbackRedirectUrl="/trips" signUpFallbackRedirectUrl="/trips" />

      </div>
    </div>
  );
}
