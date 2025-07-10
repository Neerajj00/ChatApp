import { Router } from 'express';
import {authorize} from "./../middlewares/auth.middleware.js"
import { getMyFriends, getRecommendedUsers } from '../controllers/user.controller.js';

const router = Router();

router.use(authorize);

router.get('/', getRecommendedUsers);
router.get('/friends', getMyFriends);

export default router;