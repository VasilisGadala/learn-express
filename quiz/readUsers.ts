import express, { Response } from 'express';
import { User, UserRequest } from './types';

const router = express.Router();

const addMsgToRequest = (req: UserRequest, res: Response, next: express.NextFunction) => {
  if (req.app.locals.users) {
    req.users = req.app.locals.users;
    next();
  } else {
    return res.status(404).json({
      error: { message: 'users not found', status: 404 }
    });
  }
};

router.use(addMsgToRequest);

router.get('/usernames', (req: UserRequest, res: Response) => {
  let usernames = req.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

router.get('/username/:name', (req: UserRequest, res: Response) => {
  const username = req.params.name;
  const usersWithUsername = req.users?.filter(user => user.username === username);

  if (usersWithUsername && usersWithUsername.length > 0) {
    const emails = usersWithUsername.map(user => ({
      id: user.id,
      email: user.email
    }));
    res.send(emails);
  } else {
    res.status(404).json({ error: { message: 'User not found', status: 404 } });
  }
});

export default router;