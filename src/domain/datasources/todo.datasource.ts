import { CreateTodoDto, UpdateTodoDto } from '../dtos';
import { TodoEntity } from '../entities/todo.entity';


export interface TodoDatasource {

  findAll(): Promise<TodoEntity[]>;

  findOne(id: number): Promise<TodoEntity>;

  create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
  
  update( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;

  delete(id: number): Promise<boolean>;

}
