import { Request, Response } from "express";
import { authService } from '@gateway/services/api/auth.service'
import { AxiosResponse } from "axios";
import { StatusCodes } from 'http-status-codes';
import { socketIO } from "@gateway/server";
import { GatewayCache } from "@gateway/redis/gateway.cache";


const gatewayCache: GatewayCache = new GatewayCache();

export class CurrentUser {
    public async read(_req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await authService.getCurrentUser();
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    public async resendEmail(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await authService.resendEmail(req.body);
        req.session = { jwt: response.data.token };
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    public async getLoggedInUsers(_req: Request, res: Response): Promise<void> {
        const response: string[] = await gatewayCache.getLoggedInUsersFromCache('loggedInUsers');
        socketIO.emit('online', response);
        res.status(StatusCodes.OK).json({ message: 'User is online' });
    }

    public async removeLoggedInUser(req: Request, res: Response): Promise<void> {
        const response: string[] = await gatewayCache.removeLoggedInUserFromCache('loggedInUsers', req.params.username);
        socketIO.emit('online', response);
        res.status(StatusCodes.OK).json({ message: 'User is offline' });
    }
}

