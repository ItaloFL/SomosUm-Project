import { RefreshTokenController } from '@modules/Accounts/UseCase/refreshToken/RefreshTokenController';
import { AutenticateUserController } from '@modules/Accounts/UseCase/SessionUser/AutenticateUserController';
import { Router } from 'express'


const authenticateRoutes = Router();

const autenticateUserController = new AutenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/login", autenticateUserController.handle)// login do usuário
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)// rota de refresh token

export { authenticateRoutes }