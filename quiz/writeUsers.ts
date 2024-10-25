import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { User, UserRequest } from './types';

const router = express.Router();

router.post('/adduser', (req: UserRequest, res: Response) => {
  let newuser = req.body as User;
  const users = req.app.locals.users;
  users.push(newuser);
  
  const dataFile = path.resolve(__dirname, '../data/users.json');
  fs.writeFile(dataFile, JSON.stringify(users), (err) => {
    if (err) {
      console.log('Failed to write');
      res.status(500).json({ error: { message: 'Failed to add user', status: 500 } });
    } else {
      console.log('User Saved');
      res.send('User added successfully');
    }
  });
});

export default router;