import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const log = (msg: string) => {
  const entry = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(path.join(process.cwd(), 'debug.log'), entry);
};

export const userController = {
  uploadProfilePhoto: (req: Request, res: Response) => {
    console.log('Profile Upload Request Received');
    console.log('REQ FILE:', req.file);
    console.log('REQ BODY:', req.body);
    
    try {
      if (!req.file) {
        console.error('Upload Error: No file found in request');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log('Upload Success, File Path:', (req.file as any).path);

      res.status(200).json({
        message: 'Profile photo updated successfully',
        url: (req.file as any).path,
      });
    } catch (error: any) {
      log(`UPLOAD ERROR FULL: ${error.stack || error}`);
      res.status(500).json({ error: 'Internal server error during photo upload' });
    }
  }
};
