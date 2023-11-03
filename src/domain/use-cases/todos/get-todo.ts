import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.datasource';


export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}


export class GetTodo implements GetTodoUseCase {
  
  ///* DI
  constructor(private readonly repository: TodoRepository) {}


  execute(id: number): Promise<TodoEntity> {
    return this.repository.findOne(id);
  }

}
