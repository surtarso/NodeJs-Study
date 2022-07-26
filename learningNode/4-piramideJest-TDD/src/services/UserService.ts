import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'

//interface tipando os parametros
interface IUserService {
  userRepository?: UserRepository
  name: string
  email: string
}


export class UserService {
  private userRepository: UserRepository
  private user: User

  constructor ({
    //constroi caso nao exista um user repository
    userRepository = getCustomRepository(UserRepository),
    name,
    email
  }: IUserService) {
    this.userRepository = userRepository
    this.user = new User(name, email)
  }

  async createUser (): Promise<User> {
    return await this.userRepository.save(this.user)
  }
}
