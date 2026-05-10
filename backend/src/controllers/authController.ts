import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const user = await authService.signup(email, password, name);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await authService.getUserProfile(userId);
        res.status(200).json({ user });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
