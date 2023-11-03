import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.datasource';


export interface GetTodosUseCase {
  execute(): Promise<TodoEntity[]>
}


export class GetTodos implements GetTodosUseCase {
  
  ///* DI
  constructor(private readonly repository: TodoRepository) {}

  
  execute(): Promise<TodoEntity[]> {
    return this.repository.findAll();
  }

}

