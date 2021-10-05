import {Router} from 'express';
import { userRouter } from '../components/users/users.router';

const routes = Router();
const API = '/api/v1';

routes.use(`${API}/users`, userRouter);

export default routes;


