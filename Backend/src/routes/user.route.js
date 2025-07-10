import { Router } from 'express';
import {authorize} from "./../middlewares/auth.middleware.js"
import { getMyFriends, getRecommendedUsers ,sendFriendRequest, acceptFriendRequest ,getFriendRequests } from '../controllers/user.controller.js';

const router = Router();

router.use(authorize);

router.get('/', getRecommendedUsers);
router.get('/friends', getMyFriends);

router.get('/friend-request/:id', sendFriendRequest);
router.get('/friend-request/:id/accept', acceptFriendRequest); 

router.get('/friend-requests', getFriendRequests);


export default router;