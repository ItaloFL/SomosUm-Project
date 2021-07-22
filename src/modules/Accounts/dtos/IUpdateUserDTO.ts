import { ICreateUserDTO } from "./ICreateUserDTO";

export type IUpdateUserDTO =
Pick<ICreateUserDTO, "username" | "church" | "whatsapp" | "data_nascimento">
