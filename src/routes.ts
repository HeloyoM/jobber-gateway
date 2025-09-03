import { Application } from 'express';
import { healthRoutes } from '@gateway/routes/health';
import { authRoutes } from '@gateway/routes/auth';
import { authMiddleware } from './services/auth-middleware';
import { currentUserRoutes } from './routes/current-user';


const BASE_PATH = '/api/gateway/v1';

export function appRoutes(app: Application): void {
    app.use('', healthRoutes.routes());
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
} 