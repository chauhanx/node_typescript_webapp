import {Router} from 'express';
import { userRouter } from '../components/users/users.router';
import { imageRouter } from '../components/image/image.route';

const routes = Router();
const API = '/api/v2';

routes.use(`${API}/users`, userRouter);
routes.use(`${API}/user/self/pic`, imageRouter);
export default routes;


