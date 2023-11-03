import { TodoRepository } from '../../repositories/todo.datasource';


export interface DeleteTodoUseCase {
  execute(id: number): Promise<boolean>;
}


export class DeleteTodo implements DeleteTodoUseCase {
  
  ///* DI
  constructor(private readonly repository: TodoRepository) {}


  execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

}
