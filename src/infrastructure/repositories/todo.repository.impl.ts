import { TodoDatasource, TodoEntity, TodoRepository } from '@/domain';
import { CreateTodoDto, UpdateTodoDto } from '@/domain/dtos';


export class TodoRepositoryImpl implements TodoRepository {

  ///* DI
  constructor(private readonly datasource: TodoDatasource) {}


  findAll(): Promise<TodoEntity[]> {
    return this.datasource.findAll();
  }

  findOne(id: number): Promise<TodoEntity> {
    return this.datasource.findOne(id);
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.update(updateTodoDto);
  }

  delete(id: number): Promise<boolean> {
    return this.datasource.delete(id);
  }

}
