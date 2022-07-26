import { EntityRepository, EntityManager } from 'typeorm'
import { User } from '../entities/User'

@EntityRepository(User)
export class UserRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    //retorna uma promise
    save = async (user: User): Promise<User> => {
      //recebe um objeto user e salva
      const newUser: User = await this.manager.save(user)
      return newUser
    }
}
