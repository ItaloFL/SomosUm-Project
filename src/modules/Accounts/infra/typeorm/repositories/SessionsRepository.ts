import { Repository, EntityRepository,} from "typeorm"
import { Session } from "@modules/Adverts/infra/typeorm/entities/Session"

@EntityRepository( Session )
class SessionsRepository extends Repository<Session> {}

export { SessionsRepository }