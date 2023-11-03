import { CreateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.datasource';


export type CreateTodoUseCase = {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}


export class CreateTodo implements CreateTodoUseCase {

  ///* DI
  constructor(private readonly repository: TodoRepository) {}


  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }

}
