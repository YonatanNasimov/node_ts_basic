import { usersRoutes } from './features/users/users.route';
import { Application } from 'express';
import { indexRoutes } from '@index/index.route';
import { authRoutes } from '@auth/auth.route';
import { bookRoutes } from '@books/books.route';

const BASE_PATH = '/api';

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, indexRoutes.routes());
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, bookRoutes.routes());
    app.use(BASE_PATH, usersRoutes.routes());
  };

  routes();
};