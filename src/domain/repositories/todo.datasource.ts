import { TodoEntity } from '../entities/todo.entity';


export interface TodoRepository {

  findAll(): Promise<TodoEntity[]>;

  findOne(id: number): Promise<TodoEntity>;

  create(todo: TodoEntity): Promise<TodoEntity>;

  update(todo: TodoEntity): Promise<TodoEntity>;

  delete(id: number): Promise<boolean>;

}
