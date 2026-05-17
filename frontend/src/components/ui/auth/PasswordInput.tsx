import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassInput from './GlassInput';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, error, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <GlassInput
        type={show ? 'text' : 'password'}
        label={label}
        error={error}
        icon={<Lock className="size-4" />}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3.5 top-[38px] text-zinc-500 hover:text-white transition-colors"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
};

export default PasswordInput;
