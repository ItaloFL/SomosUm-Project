import { Router } from 'express'

import { authMiddleware } from '../middlewares/authMiddlewares';

import { UserPerfilController } from '@modules/Accounts/UseCase/ShowUserPerfil/UserPerfilController'
import { UpdateUserController } from '@modules/Accounts/UseCase/updateUser/UpdateUserController'
import { SendMailController } from '@modules/Accounts/UseCase/sendMail/SendMailController'
import { UpdatePasswordController } from '@modules/Accounts/UseCase/updatePassword/UpdatePasswordController'
import { CreateUserController } from '@modules/Accounts/UseCase/createUser/CreateUserController'
import { CompareCodeController } from '@modules/Accounts/UseCase/CompareCode/CompareCodeController'
import { newPasswordMiddleware } from '../middlewares/newPasswordMidddleware';
import { ListUsersController } from '@modules/Accounts/UseCase/ListUsers/ListUserController'

const userRoutes = Router()

const userPerfilController = new UserPerfilController()
const updateUserController = new UpdateUserController()
const sendMailController = new SendMailController()
const updatePasswordUserController = new UpdatePasswordController()
const createUserController = new CreateUserController()
const compareCodeController = new CompareCodeController()
const listUsersController = new ListUsersController()

userRoutes.post("/users", createUserController.handle );//criar usúario

userRoutes.get("/perfil", authMiddleware, userPerfilController.handle);// Mostrar perfil do usuario
userRoutes.post("/UpdateUser", authMiddleware, updateUserController.handle ); //atualizar usuario

userRoutes.post("/forgotPassword", sendMailController.handle);//Verificar e enviar email
userRoutes.post("/code", compareCodeController.handle);//Verificar Codigo
userRoutes.put("/redefine", newPasswordMiddleware, updatePasswordUserController.handle);//definir nova senha // ANTIGO NOME DA ROTA "passWD"

userRoutes.get("/listUsers", authMiddleware, listUsersController.handle);//listar usuarios

export { userRoutes }