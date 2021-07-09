export interface ICreateUserDTO {
    username: string,
    user_id?: string,
    email: string,
    passwd: string,
    whatsapp: string,
    church: string,
    genero: boolean,
    photo?: string,
    CPF?: string,
    CNPJ?: string,
    isCNPJ: boolean,
    isAdmin: boolean,
    data_nascimento: string
  }