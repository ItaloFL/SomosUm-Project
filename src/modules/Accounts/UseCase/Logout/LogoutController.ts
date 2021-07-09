// import { Request } from "express";

// class LogoutController{
//   async handle(request: Request, response: Response){

//     const user_id = request.userId
//     const sessionsRepository = getCustomRepository(SessionsRepository);

//     const info = await sessionsRepository.findOne({
//         where: {logout: null, user_id}
//     })

//     info.logout = new Date()
//     await sessionsRepository.save( info );
    
//       return response.status(200)
          
//   }
// }

// export { LogoutController }