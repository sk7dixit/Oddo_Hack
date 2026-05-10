import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Mock DB for now, would use Prisma/Database in reality
const users: any[] = [];

export const signup = async (email: string, password: string, name: string) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    const newUser = { id: users.length + 1, email, password, name };
    users.push(newUser);
    return { id: newUser.id, email: newUser.email, name: newUser.name };
};

export const login = async (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    return { 
        user: { id: user.id, email: user.email, name: user.name }, 
        token 
    };
};

export const getUserProfile = async (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }
    return { id: user.id, email: user.email, name: user.name };
};
