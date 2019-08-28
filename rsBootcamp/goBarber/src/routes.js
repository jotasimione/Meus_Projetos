import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'José S. Simione',
    email: 'js@bootcamp.com.br',
    password_hash: 'testeasas',
  });
  return res.json(user);
});

export default routes;
