import express from 'express'
const router = express.Router();
import {getPosts} from '../controllers/post_controller.js'

router.get('/',getPosts);

export default router;