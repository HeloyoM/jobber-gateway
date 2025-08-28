import { Application } from 'express';
import { healthRoutes } from './routes/health';

export function appRoutes(app: Application): void {
    app.use('', healthRoutes.routes())
} 