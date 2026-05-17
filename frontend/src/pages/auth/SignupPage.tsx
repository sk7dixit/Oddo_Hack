import { SignUp } from '@clerk/clerk-react';
import bgImage from '../../assets/image.png';
import './Auth.css';

export default function SignupPage() {
  return (
    <div className="auth-container">
      <div className="auth-bg-layer" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="auth-card-wrapper">
        <SignUp fallbackRedirectUrl="/trips" signInFallbackRedirectUrl="/login" />

      </div>
    </div>
  );
}
