import { cnpj, cpf } from "cpf-cnpj-validator";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../Repositories/IUserRepository";


@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ){}

    async execute({
      user_id, 
      username,
      email,
      passwd,
      whatsapp,
      church,
      genero,
      photo,
      CPF,
      CNPJ, isAdmin, isCNPJ, data_nascimento }: ICreateUserDTO): Promise<void>{
      
      if (!username || !email || !whatsapp || !church || !data_nascimento){
        throw new AppError("Campo obrigatorio não preenchido")
      }
      
      
      //Verificando se o usuário existe;
      const userExists = await this.userRepository.findbyEmail(
       email
      );
          
      //Se existir, retorna usuário existente;
      if(userExists) {
       throw new AppError("Já existe uma conta com o email fornecido!")
      }
          
      if(passwd.length < 8){
       throw new AppError("Tamanho de senha insuficiente!")
      }
          
      //Verificando validade de CPF/CNPJ
      
      // if (isCNPJ) {
      //   if (!CNPJ) {
      //     throw new AppError("Campo de CNPJ é obrigatório!")
      //   }
      //   CNPJ = CNPJ.trim()
      //   if (!cnpj.isValid(CNPJ)) {
      //     throw new AppError("CNPJ incorreto")
      //   }
      //   const cnpjAlreadyExist = await this.userRepository.findbyCNPJ(CNPJ)
      //   if (cnpjAlreadyExist) {
      //     throw new AppError("CNPJ já cadastrado!")
      //   }
      // }
      // else {
      //   if (!CPF) {
      //     throw new AppError("Campo de CPF é obrigatório!")
      //   }

      //   CPF = CPF.trim()
      //   if (!cpf.isValid(CPF)) {
      //     throw new AppError("CPF incorreto")
      //   }
      //   const cpfAlreadyExist = await this.userRepository.findbyCPF(CPF)
      //   if (cpfAlreadyExist) {
      //     throw new AppError("CPF já cadastrado!")
      //   }
      // }            //ALGUM ERRO NESSA VERIFICAÇÃO
      
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