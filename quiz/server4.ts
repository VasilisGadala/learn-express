import fs from 'fs';
import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import readUsersRouter from './readUsers';
import writeUsersRouter from './writeUsers';
import { User } from './types';

const app: Express = express();
const port: number = 8000;

const dataFile = '../data/users.json';

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.readFile(path.resolve(__dirname, dataFile), (err, data) => {
  console.log('reading file ... ');
  if (err) throw err;
  app.locals.users = JSON.parse(data.toString()) as User[];
});

app.use('/read', readUsersRouter);
app.use('/write', writeUsersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});