import { cnpj as cn, cpf as cp } from 'cpf-cnpj-validator'
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../Repositories/IUserRepository";


@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({
    username,
    email,
    passwd,
    whatsapp,
    church,
    genero,
    photo,
    CPF,
    CNPJ, isAdmin, isCNPJ, data_nascimento }: ICreateUserDTO): Promise<void> {

    if (!username || !email || !whatsapp || !church || !data_nascimento) {
      throw new AppError("missing field!")
    }

    //Verificando se o usuário existe;
    const userExists = await this.userRepository.findbyEmail(
      email
    );

    //Se existir, retorna usuário existente;
    if (userExists) {
      throw new AppError("User Already exist!")
    }

    if (passwd.length < 8) {
      throw new AppError("Insufficient password length!")
    }

    // //Verificando validade de CPF/CNPJ

    if (isCNPJ) {
      CPF = null

      if (!CNPJ) {
        throw new AppError("CNPJ field missing!")
      }
      if (!cn.isValid(CNPJ)) {
        throw new AppError("CNPJ incorret")
      }
      const cnpjAlreadyExist = await this.userRepository.findbyCNPJ(CNPJ)
      if (cnpjAlreadyExist) {
        throw new AppError("CNPJ já cadastrado!")
      }
    }
    else {
      CNPJ = null
      if (!CPF) {
        throw new AppError("CPF field missing!")
      }

      if (!cp.isValid(CPF)) {
        throw new AppError("CPF incorret")
      }
      const cpfAlreadyExist = await this.userRepository.findbyCPF(CPF)
      if (cpfAlreadyExist) {
        throw new AppError("CPF já cadastrado!")
      }
    }

    //Se não, criar um no banco de Dados;
    const user = this.userRepository.create({
      church,
      data_nascimento,
      email,
      genero,
      isAdmin,
      isCNPJ,
      passwd,
      username,
      whatsapp,
      CNPJ,
      CPF,
      photo
    })

    return user;
  }
}




export { CreateUserUseCase }