import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();
const controller = new UsersController();

router.get('/', controller.index);

router.get('/:nickname', controller.get);

router.post('/', controller.create);

router.patch('/:id', controller.updateNickname);

export default router;
