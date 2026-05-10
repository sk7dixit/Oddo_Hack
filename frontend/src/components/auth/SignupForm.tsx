import React, { useState } from 'react';
import * as authService from '../../services/authService';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await authService.signup({ name, email, password });
            console.log('Signup Result:', result);
        } catch (error) {
            console.error('Signup Failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Signup</h2>
            <input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
