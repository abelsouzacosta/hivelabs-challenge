import { Router } from 'express';
import userRouter from '@modules/users/routes/users.routes';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({
    message: 'Hello World',
  }),
);

router.use('/users', userRouter);

export default router;
